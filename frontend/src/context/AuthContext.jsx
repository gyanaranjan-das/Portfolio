import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../api/admin';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const { data } = await getMe();
            setAdmin(data.admin);
        } catch {
            localStorage.removeItem('admin_token');
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    };

    const loginAdmin = (token, adminData) => {
        localStorage.setItem('admin_token', token);
        setAdmin(adminData);
    };

    const logoutAdmin = () => {
        localStorage.removeItem('admin_token');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, loading, loginAdmin, logoutAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
