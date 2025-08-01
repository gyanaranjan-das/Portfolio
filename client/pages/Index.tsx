import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Preloader from "../components/Preloader";
import ContactForm from "../components/ContactForm";

const techIcons = {
  Python: "🐍",
  JavaScript: "💛",
  Java: "☕",
  "C++": "⚡",
  React: "⚛️",
  "Node.js": "🟢",
  TensorFlow: "🧠",
  PyTorch: "🔥",
  Docker: "🐳",
  Kubernetes: "⭐",
  AWS: "☁️",
  MongoDB: "🍃",
};

const programmingLanguages = [
  { name: "Python", level: 95, icon: "🐍" },
  { name: "JavaScript", level: 90, icon: "🟨" },
  { name: "Java", level: 85, icon: "☕" },
  { name: "C++", level: 80, icon: "⚡" },
  { name: "TypeScript", level: 88, icon: "📘" },
  { name: "Go", level: 75, icon: "🔵" },
];

const aimlFrameworks = [
  {
    name: "TensorFlow",
    icon: "🧠",
    description: "Deep Learning & Neural Networks",
  },
  { name: "PyTorch", icon: "🔥", description: "Research & Computer Vision" },
  {
    name: "OpenCV",
    icon: "👁️",
    description: "Computer Vision & Image Processing",
  },
  {
    name: "Scikit-learn",
    icon: "📊",
    description: "Machine Learning & Data Analysis",
  },
  { name: "Pandas", icon: "🐼", description: "Data Manipulation & Analysis" },
  { name: "NumPy", icon: "🔢", description: "Numerical Computing" },
];

const quantumTools = [
  { name: "Qiskit", icon: "⚛️", description: "IBM Quantum Development" },
  { name: "Cirq", icon: "🔄", description: "Google Quantum AI" },
  { name: "PennyLane", icon: "🪙", description: "Quantum Machine Learning" },
  { name: "Quantum Inspire", icon: "💡", description: "QuTech Platform" },
];

const devopsTools = [
  { name: "Docker", icon: "🐳", description: "Containerization" },
  { name: "Kubernetes", icon: "☸️", description: "Container Orchestration" },
  { name: "GitHub Actions", icon: "⚙️", description: "CI/CD Automation" },
  { name: "Jenkins", icon: "🔧", description: "Build Automation" },
  { name: "Terraform", icon: "🏗️", description: "Infrastructure as Code" },
  { name: "Ansible", icon: "📋", description: "Configuration Management" },
];

const cloudServices = [
  { name: "AWS", icon: "���️", description: "Cloud Infrastructure" },
  { name: "Firebase", icon: "🔥", description: "Backend Services" },
  { name: "MongoDB", icon: "🍃", description: "NoSQL Database" },
  { name: "PostgreSQL", icon: "🐘", description: "Relational Database" },
  { name: "Redis", icon: "🔴", description: "In-Memory Cache" },
  { name: "GraphQL", icon: "🌐", description: "API Query Language" },
];

const systemDesignConcepts = [
  {
    title: "Distributed Systems",
    topics: [
      "Microservices",
      "Event-Driven Architecture",
      "CQRS",
      "Saga Pattern",
    ],
    icon: "🔗",
  },
  {
    title: "Scalability",
    topics: [
      "Load Balancing",
      "Horizontal Scaling",
      "Caching Strategies",
      "CDN",
    ],
    icon: "📈",
  },
  {
    title: "Data Engineering",
    topics: ["Apache Kafka", "Apache Spark", "ETL Pipelines", "Data Lakes"],
    icon: "🏗️",
  },
  {
    title: "Security",
    topics: ["OAuth 2.0", "JWT", "API Security", "Zero Trust"],
    icon: "🔒",
  },
];

const projects = [
  {
    title: "Quantum ML Optimizer",
    description:
      "Hybrid classical-quantum machine learning framework for optimization problems",
    tech: ["Python", "Qiskit", "TensorFlow", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Distributed AI Pipeline",
    description:
      "Scalable microservices architecture for real-time AI model inference",
    tech: ["Kubernetes", "Python", "FastAPI", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "DevOps Automation Suite",
    description:
      "Complete CI/CD pipeline with infrastructure as code and monitoring",
    tech: ["Terraform", "GitHub Actions", "AWS", "Prometheus"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

const certificates = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  { name: "TensorFlow Developer Certificate", issuer: "Google", year: "2024" },
  { name: "Certified Kubernetes Administrator", issuer: "CNCF", year: "2023" },
  { name: "IBM Quantum Developer", issuer: "IBM", year: "2024" },
];

export default function Index() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />;
  }

  const TechCard = ({
    name,
    icon,
    description,
  }: {
    name: string;
    icon: string;
    description?: string;
  }) => (
    <div className="tech-card group cursor-pointer">
      <div className="text-center">
        <div className="text-3xl mb-2 group-hover:animate-bounce">{icon}</div>
        <h3 className="font-semibold text-foreground">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-quantum-primary">Gyan</div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: "hero", label: "Home", isHash: true },
                { id: "about", label: "About", isHash: true },
                { id: "skills", label: "Skills", isHash: true },
                { id: "projects", label: "Projects", isHash: true },
                { id: "contact", label: "Contact", isHash: true },
              ].map(({ id, label, isHash }) => (
                <a
                  key={id}
                  href={isHash ? `#${id}` : `/${id}`}
                  className={`transition-colors duration-300 ${
                    activeSection === id
                      ? "text-quantum-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </a>
              ))}
              <Link
                to="/work"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Work
              </Link>
              <Link
                to="/resume"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Resume
              </Link>
              <Link
                to="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-quantum-grid opacity-10" />

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {Object.entries(techIcons).map(([tech, icon], index) => (
            <div
              key={tech}
              className="absolute text-2xl opacity-20 animate-float"
              style={{
                left: `${10 + ((index * 13) % 80)}%`,
                top: `${20 + ((index * 17) % 60)}%`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: `${3 + (index % 3)}s`,
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="text-foreground">Gyanaranjan</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-primary via-quantum-secondary to-quantum-accent">
                  Das
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Engineering the Future with Code and Qubits
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-quantum-primary">
                <span>AI/ML Engineer</span>
                <span>•</span>
                <span>Quantum Computing</span>
                <span>•</span>
                <span>DevOps Architect</span>
                <span>•</span>
                <span>System Designer</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/work"
                className="px-8 py-3 bg-quantum-primary text-background font-semibold rounded-lg hover:bg-quantum-secondary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-quantum-primary/25 inline-block text-center"
              >
                View My Work
              </Link>
              <button className="px-8 py-3 border border-quantum-primary text-quantum-primary font-semibold rounded-lg hover:bg-quantum-primary hover:text-background transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>

            <div className="flex justify-center space-x-6 pt-8">
              {[
                {
                  icon: Github,
                  href: "https://github.com/gyanaranjan-das",
                  external: true,
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/gyanaranjan-das",
                  external: true,
                },
                {
                  icon: Mail,
                  href: "mailto:dasgyanaranjan835@gmail.com",
                  external: false,
                },
              ].map(({ icon: Icon, href, external }, index) => (
                <a
                  key={index}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-quantum-primary transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="w-6 h-6 animate-bounce text-quantum-primary" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-quantum-primary to-quantum-secondary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate B.Tech Computer Science Engineering student
                with a deep fascination for cutting-edge technologies that shape
                our future. My journey spans across artificial intelligence,
                quantum computing, and scalable system architecture.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With expertise in machine learning frameworks, quantum
                algorithms, and cloud-native architectures, I bridge the gap
                between theoretical computer science and practical engineering
                solutions.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-quantum-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-quantum-primary">
                    8+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center p-4 bg-quantum-secondary/10 rounded-lg">
                  <div className="text-2xl font-bold text-quantum-secondary">
                    2+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Years Learning
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="w-full h-96 bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 rounded-2xl flex items-center justify-center overflow-hidden">
                {/* Clean Terminal/Code Style */}
                <div className="font-mono text-left space-y-2 text-sm">
                  <div className="flex items-center gap-2 opacity-80">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-muted-foreground ml-4">
                      ~/gyan-portfolio
                    </span>
                  </div>
                  <div className="mt-6 space-y-1">
                    <div className="flex items-center">
                      <span className="text-quantum-primary">$</span>
                      <span className="ml-2 text-foreground">whoami</span>
                    </div>
                    <div className="text-quantum-secondary ml-4">
                      gyanaranjan-das
                    </div>

                    <div className="flex items-center mt-3">
                      <span className="text-quantum-primary">$</span>
                      <span className="ml-2 text-foreground">
                        cat skills.txt
                      </span>
                    </div>
                    <div className="ml-4 text-quantum-accent">
                      AI/ML • Quantum • DevOps
                    </div>

                    <div className="flex items-center mt-3">
                      <span className="text-quantum-primary">$</span>
                      <span className="ml-2 text-foreground">ls projects/</span>
                    </div>
                    <div className="ml-4 text-muted-foreground">
                      <div>harmoniQ/ quantum-simulator/ face-lock/</div>
                    </div>

                    <div className="flex items-center mt-3">
                      <span className="text-quantum-primary">$</span>
                      <span className="ml-2 text-foreground animate-pulse">
                        |
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-quantum-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-quantum-primary/20 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Technical Arsenal
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-quantum-primary to-quantum-secondary mx-auto"></div>
          </div>

          {/* Programming Languages */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
              Programming Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {programmingLanguages.map((lang, index) => (
                <div
                  key={lang.name}
                  className="tech-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{lang.icon}</div>
                    <h4 className="font-semibold">{lang.name}</h4>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div
                        className="bg-quantum-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {lang.level}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI/ML Frameworks */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
              AI/ML Frameworks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aimlFrameworks.map((framework, index) => (
                <TechCard key={framework.name} {...framework} />
              ))}
            </div>
          </div>

          {/* Quantum Computing */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
              Quantum Computing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quantumTools.map((tool, index) => (
                <div key={tool.name} className="tech-card quantum-glow">
                  <TechCard {...tool} />
                </div>
              ))}
            </div>
          </div>

          {/* DevOps & Tools */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
              DevOps & Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devopsTools.map((tool, index) => (
                <TechCard key={tool.name} {...tool} />
              ))}
            </div>
          </div>

          {/* Cloud & Databases */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
              Cloud & Databases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cloudServices.map((service, index) => (
                <TechCard key={service.name} {...service} />
              ))}
            </div>
          </div>

          {/* System Design & Architecture */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
              System Design & Architecture
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemDesignConcepts.map((concept, index) => (
                <div key={concept.title} className="tech-card">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{concept.icon}</div>
                    <h4 className="font-bold mb-3">{concept.title}</h4>
                    <div className="space-y-1">
                      {concept.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-block text-xs bg-quantum-primary/20 text-quantum-primary px-2 py-1 rounded-full mr-1 mb-1"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-quantum-primary to-quantum-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <div key={project.title} className="tech-card h-full">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-quantum-primary/20 text-quantum-primary px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 pt-4">
                      <a
                        href={project.liveUrl}
                        className="flex items-center gap-2 text-quantum-primary hover:text-quantum-secondary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex items-center gap-2 text-quantum-primary hover:text-quantum-secondary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Certificates */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
              Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificates.map((cert, index) => (
                <div key={cert.name} className="tech-card text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <h4 className="font-semibold mb-1">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-quantum-primary">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Let's Connect
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-quantum-primary to-quantum-secondary mx-auto"></div>
            <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
              Ready to build the future together? Let's discuss how we can
              leverage cutting-edge technology to solve complex problems.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info & Social Links */}
            <div className="space-y-8">
              <div className="tech-card">
                <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Email</h4>
                    <a
                      href="mailto:dasgyanaranjan835@gmail.com"
                      className="text-quantum-primary hover:text-quantum-secondary transition-colors"
                    >
                      dasgyanaranjan835@gmail.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Response Time
                    </h4>
                    <p className="text-muted-foreground">
                      Usually within 24 hours
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Best Time to Reach
                    </h4>
                    <p className="text-muted-foreground">
                      Monday - Friday, 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="tech-card">
                <h3 className="text-xl font-bold mb-6">Follow My Journey</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      icon: Github,
                      href: "https://github.com/gyanaranjan-das",
                      label: "GitHub",
                      external: true,
                    },
                    {
                      icon: Linkedin,
                      href: "https://www.linkedin.com/in/gyanaranjan-das",
                      label: "LinkedIn",
                      external: true,
                    },
                    {
                      icon: Mail,
                      href: "mailto:dasgyanaranjan835@gmail.com",
                      label: "Email",
                      external: false,
                    },
                  ].map(({ icon: Icon, href, label, external }) => (
                    <a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border/50 text-muted-foreground hover:text-quantum-primary hover:border-quantum-primary/50 transition-all duration-300 hover:scale-105 group"
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="tech-card bg-quantum-primary/5 border-quantum-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-bold">
                    Available for Opportunities
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  I'm currently open to internship opportunities in AI/ML,
                  Quantum Computing, and Backend Development. Let's build
                  something amazing together!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 Gyanaranjan Das. Crafted with quantum precision and
            classical elegance.
          </p>
        </div>
      </footer>
    </div>
  );
}
