import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "HarmoniQ",
    subtitle: "AI-Enhanced Music Application",
    description:
      "A sophisticated music streaming application enhanced with AI integration for personalized recommendations, smart playlists, and music discovery based on user preferences and listening patterns.",
    fullDescription:
      "HarmoniQ represents the convergence of music streaming and artificial intelligence. Built with modern web technologies, it features real-time music analysis, emotion-based recommendations, and social listening experiences. The AI engine analyzes user behavior, musical preferences, and contextual data to create truly personalized music experiences.",
    tech: ["React", "Python", "TensorFlow", "Firebase", "Node.js", "Express"],
    category: "AI/ML",
    status: "In Development",
    timeline: "Dec 2024 - Present",
    features: [
      "AI-powered music recommendations",
      "Real-time emotion detection from music",
      "Smart playlist generation",
      "Social listening features",
      "Cross-platform synchronization",
    ],
    challenges: [
      "Implementing real-time audio analysis",
      "Building scalable recommendation engine",
      "Optimizing for low-latency streaming",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/gyanaranjan-das",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Quantum Circuit Simulator",
    subtitle: "IBM Qiskit-Based Quantum Computing Platform",
    description:
      "A comprehensive quantum circuit simulator built using Qiskit, enabling users to design, simulate, and analyze quantum algorithms with an intuitive visual interface.",
    fullDescription:
      "This quantum circuit simulator bridges the gap between theoretical quantum computing and practical implementation. Built on IBM's Qiskit framework, it provides an educational and research platform for quantum algorithm development. Features include drag-and-drop circuit design, real-time simulation, and integration with IBM Quantum hardware.",
    tech: ["Python", "Qiskit", "JavaScript", "React", "IBM Quantum", "NumPy"],
    category: "Quantum Computing",
    status: "Completed",
    timeline: "Aug 2024 - Nov 2024",
    features: [
      "Visual quantum circuit designer",
      "Real-time quantum state visualization",
      "IBM Quantum hardware integration",
      "Quantum algorithm library",
      "Educational tutorials and examples",
    ],
    challenges: [
      "Visualizing complex quantum states",
      "Handling quantum decoherence in simulations",
      "Creating intuitive quantum gate interfaces",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/gyanaranjan-das",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Face Lock Security System",
    subtitle: "Real-time Facial Recognition with OpenCV",
    description:
      "An advanced facial recognition security system using OpenCV and deep learning for real-time authentication and access control.",
    fullDescription:
      "A cutting-edge security solution that combines computer vision with machine learning to provide robust facial recognition capabilities. The system features real-time processing, anti-spoofing measures, and integration with existing security infrastructure. Built with privacy-first principles and edge computing capabilities.",
    tech: ["Python", "OpenCV", "TensorFlow", "Keras", "SQLite", "Raspberry Pi"],
    category: "Computer Vision",
    status: "Completed",
    timeline: "May 2024 - Jul 2024",
    features: [
      "Real-time facial recognition",
      "Anti-spoofing detection",
      "Multiple face enrollment",
      "Access logging and analytics",
      "Edge computing optimization",
    ],
    challenges: [
      "Achieving high accuracy in varying lighting",
      "Implementing anti-spoofing measures",
      "Optimizing for resource-constrained devices",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/gyanaranjan-das",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Smart Campus IoT System",
    subtitle: "IoT-Based Campus Automation",
    description:
      "An integrated IoT system for smart campus management including automated attendance, energy monitoring, and facility optimization.",
    tech: ["Arduino", "Raspberry Pi", "Python", "Flask", "MQTT", "MongoDB"],
    category: "IoT",
    status: "Prototype",
    timeline: "Jan 2024 - Apr 2024",
    liveUrl: "#",
    githubUrl: "https://github.com/gyanaranjan-das",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Distributed Task Scheduler",
    subtitle: "Microservices-Based Job Queue System",
    description:
      "A scalable distributed task scheduling system built with microservices architecture for handling large-scale background job processing.",
    tech: ["Go", "Docker", "Kubernetes", "Redis", "PostgreSQL", "gRPC"],
    category: "System Design",
    status: "In Development",
    timeline: "Oct 2024 - Present",
    liveUrl: "#",
    githubUrl: "https://github.com/gyanaranjan-das",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  },
];

const categories = [
  "All",
  "AI/ML",
  "Quantum Computing",
  "Computer Vision",
  "IoT",
  "System Design",
];

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = filteredProjects.filter(
    (project) => project.featured,
  );
  const otherProjects = filteredProjects.filter((project) => !project.featured);

  const ProjectCard = ({
    project,
    featured = false,
  }: {
    project: any;
    featured?: boolean;
  }) => (
    <div
      className={`tech-card cursor-pointer group ${featured ? "lg:col-span-2" : ""}`}
      onClick={() => setSelectedProject(project)}
    >
      {project.image && (
        <div
          className={`relative overflow-hidden rounded-lg mb-4 ${featured ? "h-64" : "h-48"}`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {project.featured && (
            <div className="absolute top-4 left-4 bg-quantum-primary text-background px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
          <div className="absolute top-4 right-4 bg-background/80 text-foreground px-3 py-1 rounded-full text-xs">
            {project.category}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3
            className={`font-bold text-foreground group-hover:text-quantum-primary transition-colors ${featured ? "text-2xl" : "text-xl"}`}
          >
            {project.title}
          </h3>
          <p className="text-sm text-quantum-primary font-medium">
            {project.subtitle}
          </p>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, featured ? 6 : 4).map((tech: string) => (
            <span
              key={tech}
              className="text-xs bg-quantum-primary/20 text-quantum-primary px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{project.timeline}</span>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs ${
                project.status === "Completed"
                  ? "bg-green-500/20 text-green-400"
                  : project.status === "In Development"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {project.status}
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={project.liveUrl}
              onClick={(e) => e.stopPropagation()}
              className="text-quantum-primary hover:text-quantum-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={project.githubUrl}
              onClick={(e) => e.stopPropagation()}
              className="text-quantum-primary hover:text-quantum-secondary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

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
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link to="/work" className="text-quantum-primary">
                Work
              </Link>
              <Link
                to="/resume"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Resume
              </Link>
              <Link
                to="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
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
            <span className="text-foreground">My</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-primary via-quantum-secondary to-quantum-accent ml-4">
              Work
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of projects spanning AI/ML, quantum computing, and
            cutting-edge system design. Each project represents a journey of
            learning and innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-quantum-primary text-background"
                  : "bg-card/50 text-foreground hover:bg-card border border-border/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </section>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">
              {featuredProjects.length > 0 ? "More Projects" : "All Projects"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-quantum-primary hover:text-quantum-secondary transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-quantum-primary font-medium">
                    {selectedProject.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              {selectedProject.image && (
                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.fullDescription ||
                        selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.features && (
                    <div>
                      <h3 className="text-xl font-bold mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map(
                          (feature: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <Star className="w-4 h-4 text-quantum-primary" />
                              {feature}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                  {selectedProject.challenges && (
                    <div>
                      <h3 className="text-xl font-bold mb-3">
                        Technical Challenges
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.challenges.map(
                          (challenge: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <ArrowRight className="w-4 h-4 text-quantum-secondary" />
                              {challenge}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3">Project Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Status
                        </span>
                        <div
                          className={`inline-block ml-2 px-2 py-1 rounded-full text-xs ${
                            selectedProject.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : selectedProject.status === "In Development"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {selectedProject.status}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Timeline
                        </span>
                        <p className="font-medium">
                          {selectedProject.timeline}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Category
                        </span>
                        <p className="font-medium">
                          {selectedProject.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech: string) => (
                        <span
                          key={tech}
                          className="text-xs bg-quantum-primary/20 text-quantum-primary px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={selectedProject.liveUrl}
                      className="flex-1 flex items-center justify-center gap-2 bg-quantum-primary text-background px-4 py-3 rounded-lg hover:bg-quantum-secondary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      className="flex-1 flex items-center justify-center gap-2 border border-quantum-primary text-quantum-primary px-4 py-3 rounded-lg hover:bg-quantum-primary hover:text-background transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
