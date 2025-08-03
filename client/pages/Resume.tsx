import { Link } from "react-router-dom";
import { Download, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

const techIcons = {
  "Python": "🐍",
  "JavaScript": "🟨",
  "Java": "☕",
  "C++": "⚡",
  "TensorFlow": "🧠",
  "PyTorch": "🔥"
};

const aimlFrameworks = [
  { name: "TensorFlow", icon: "🧠", description: "Deep Learning & Neural Networks" },
  { name: "PyTorch", icon: "🔥", description: "Research & Computer Vision" },
  { name: "OpenCV", icon: "👁️", description: "Computer Vision & Image Processing" },
  { name: "Scikit-learn", icon: "📊", description: "Machine Learning & Data Analysis" }
];

const quantumTools = [
  { name: "Qiskit", icon: "⚛️", description: "IBM Quantum Development" },
  { name: "PennyLane", icon: "🪙", description: "Quantum Machine Learning" }
];

export default function Resume() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-quantum-primary">
              Gyan
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/resume" className="text-quantum-primary">
                Resume
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Resume</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            B.Tech CSE student passionate about AI, Quantum Computing, and System Design
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* About Me */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">👨‍💻</div>
                <h3 className="text-xl font-bold text-foreground">About Me</h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>Final-year-ready Computer Science student specializing in AI & Quantum Computing.</p>
                <p>Passionate about building intelligent systems, futuristic tools, and efficient software architectures.</p>
                <p>Fast learner, hacker at heart, always experimenting with AI agents and system design.</p>
              </div>
            </div>

            {/* Education */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🎓</div>
                <h3 className="text-xl font-bold text-foreground">Education</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">B.Tech in Computer Science & Engineering</h4>
                  <p className="text-muted-foreground">2022 – Present</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm bg-quantum-primary/20 text-quantum-primary px-2 py-1 rounded-full">
                      Current Year: 3rd
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🎯</div>
                <h3 className="text-xl font-bold text-foreground">Objectives</h3>
              </div>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>• Seeking internship in AI/ML, Quantum, or Backend roles</p>
                <p>• Open to research assistantships or early-stage startup opportunities</p>
                <p>• Eager to contribute to cutting-edge technology projects</p>
              </div>
            </div>

            {/* Download Resume */}
            <div className="tech-card text-center">
              <a
                href="/resume.pdf"
                download="Gyanaranjan_Das_Resume.pdf"
                className="w-full flex items-center justify-center gap-3 bg-quantum-primary text-background px-6 py-3 rounded-lg hover:bg-quantum-secondary transition-all duration-300 hover:scale-105 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Resume (PDF)
              </a>
            </div>
          </div>

          {/* Middle & Right Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills / Tech Stack */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">🧰</div>
                <h3 className="text-xl font-bold text-foreground">Skills & Tech Stack</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Languages */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-lg">💻</span>
                    Languages
                  </h4>
                  <div className="space-y-2">
                    {["Python", "Java", "C++", "JavaScript"].map((lang) => (
                      <div key={lang} className="flex items-center gap-2">
                        <span className="text-lg">{techIcons[lang as keyof typeof techIcons]}</span>
                        <span className="text-sm font-medium">{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI/ML */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-lg">🤖</span>
                    AI/ML
                  </h4>
                  <div className="space-y-2">
                    {["Scikit-learn", "TensorFlow", "PyTorch", "OpenCV"].map((tool) => (
                      <div key={tool} className="flex items-center gap-2">
                        <span className="text-lg">{aimlFrameworks.find(f => f.name === tool)?.icon || "⚡"}</span>
                        <span className="text-sm font-medium">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantum */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-lg">⚛️</span>
                    Quantum
                  </h4>
                  <div className="space-y-2">
                    {["Qiskit", "PennyLane"].map((tool) => (
                      <div key={tool} className="flex items-center gap-2">
                        <span className="text-lg">{quantumTools.find(t => t.name === tool)?.icon || "🔬"}</span>
                        <span className="text-sm font-medium">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-lg">🛠️</span>
                    Tools
                  </h4>
                  <div className="space-y-2">
                    {[
                      { name: "Git", icon: "📝" },
                      { name: "VS Code", icon: "💻" },
                      { name: "Jupyter", icon: "📊" },
                      { name: "Docker", icon: "🐳" },
                      { name: "Firebase", icon: "🔥" }
                    ].map((tool) => (
                      <div key={tool.name} className="flex items-center gap-2">
                        <span className="text-lg">{tool.icon}</span>
                        <span className="text-sm font-medium">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Systems */}
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-lg">⚙️</span>
                    Systems & Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["REST APIs", "OAuth2", "JWT", "Kafka basics", "Spark basics"].map((tech) => (
                      <span key={tech} className="text-xs bg-quantum-secondary/20 text-quantum-secondary px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">💡</div>
                <h3 className="text-xl font-bold text-foreground">Featured Projects</h3>
              </div>
              
              <div className="space-y-6">
                {/* HarmoniQ */}
                <div className="border border-border/50 rounded-lg p-4 bg-background/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">HarmoniQ</h4>
                      <p className="text-sm text-muted-foreground">A music app enhanced with AI integration</p>
                    </div>
                    <div className="flex gap-2">
                      <a href="#" className="text-quantum-primary hover:text-quantum-secondary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a href="https://github.com/gyanaranjan-das" className="text-quantum-primary hover:text-quantum-secondary transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["Python", "AI/ML", "React", "Firebase"].map((tech) => (
                      <span key={tech} className="text-xs bg-quantum-primary/20 text-quantum-primary px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantum Circuit Simulator */}
                <div className="border border-border/50 rounded-lg p-4 bg-background/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Quantum Circuit Simulator</h4>
                      <p className="text-sm text-muted-foreground">Built using Qiskit for IBM Q</p>
                    </div>
                    <div className="flex gap-2">
                      <a href="#" className="text-quantum-primary hover:text-quantum-secondary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a href="https://github.com/gyanaranjan-das" className="text-quantum-primary hover:text-quantum-secondary transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["Python", "Qiskit", "Quantum Computing", "IBM Q"].map((tech) => (
                      <span key={tech} className="text-xs bg-quantum-accent/20 text-quantum-accent px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Face Lock System */}
                <div className="border border-border/50 rounded-lg p-4 bg-background/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Face Lock System</h4>
                      <p className="text-sm text-muted-foreground">Real-time facial recognition with OpenCV</p>
                    </div>
                    <div className="flex gap-2">
                      <a href="#" className="text-quantum-primary hover:text-quantum-secondary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a href="https://github.com/gyanaranjan-das" className="text-quantum-primary hover:text-quantum-secondary transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["Python", "OpenCV", "Computer Vision", "Real-time Processing"].map((tech) => (
                      <span key={tech} className="text-xs bg-quantum-secondary/20 text-quantum-secondary px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="tech-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">📜</div>
                <h3 className="text-xl font-bold text-foreground">Certifications</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Machine Learning", issuer: "Andrew Ng (Coursera)", icon: "🎓" },
                  { name: "Quantum Computing", issuer: "IBM Qiskit", icon: "⚛️" },
                  { name: "DSA", issuer: "Coding Ninjas / GeeksforGeeks", icon: "💻" },
                  { name: "AI Fundamentals", issuer: "Various Platforms", icon: "🤖" }
                ].map((cert) => (
                  <div key={cert.name} className="border border-border/50 rounded-lg p-4 bg-background/50 text-center">
                    <div className="text-2xl mb-2">{cert.icon}</div>
                    <h4 className="font-semibold text-foreground mb-1">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12">
          <div className="tech-card max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Connect With Me</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <a
                href="mailto:dasgyanaranjan835@gmail.com"
                className="flex flex-col items-center text-center p-6 border border-quantum-primary rounded-lg hover:bg-quantum-primary hover:text-background transition-all duration-300 group"
              >
                <Mail className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-medium mb-1">Email</div>
                <div className="text-sm opacity-80 break-all">dasgyanaranjan835@gmail.com</div>
              </a>

              <a
                href="https://github.com/gyanaranjan-das"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center p-6 border border-quantum-primary rounded-lg hover:bg-quantum-primary hover:text-background transition-all duration-300 group"
              >
                <Github className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-medium mb-1">GitHub</div>
                <div className="text-sm opacity-80">gyanaranjan-das</div>
              </a>

              <a
                href="https://www.linkedin.com/in/gyanaranjan-das"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center p-6 border border-quantum-primary rounded-lg hover:bg-quantum-primary hover:text-background transition-all duration-300 group"
              >
                <Linkedin className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-medium mb-1">LinkedIn</div>
                <div className="text-sm opacity-80">gyanaranjan-das</div>
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-quantum-primary hover:text-quantum-secondary transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
