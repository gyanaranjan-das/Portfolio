const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact form (public)
// @route   POST /api/contact
exports.submitContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body);

        // Send email notification to site owner
        try {
            await sendEmail({
                to: process.env.CONTACT_EMAIL,
                subject: `Portfolio Contact: ${contact.subject}`,
                html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contact.message}</p>
        `,
            });
        } catch (emailError) {
            console.error('Email notification failed:', emailError.message);
            // Don't fail the request if email fails
        }

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all contacts (admin)
// @route   GET /api/contact
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark contact as read (admin)
// @route   PUT /api/contact/:id/read
exports.markAsRead = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, data: contact });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete contact (admin)
// @route   DELETE /api/contact/:id
exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, message: 'Contact deleted' });
    } catch (error) {
        next(error);
    }
};
