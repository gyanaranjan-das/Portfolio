import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, Zap } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import MobileNav from "../components/MobileNav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-quantum-primary">
              Gyan
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex space-x-8">
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/work"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
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

              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              <MobileNav />
            </div>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          {/* Quantum-inspired 404 Animation */}
          <div className="relative mb-12">
            <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-quantum-primary via-quantum-secondary to-quantum-accent">
              404
            </div>

            {/* Floating particles around 404 */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-quantum-primary rounded-full animate-pulse opacity-60"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + (i % 3)}s`,
                  }}
                />
              ))}
            </div>

            {/* Quantum circuit-like lines */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path
                  d="M50,100 Q200,50 350,100"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-quantum-primary"
                />
                <path
                  d="M50,120 Q200,170 350,120"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-quantum-secondary"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="4"
                  fill="currentColor"
                  className="text-quantum-accent"
                />
                <circle
                  cx="300"
                  cy="100"
                  r="4"
                  fill="currentColor"
                  className="text-quantum-primary"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Quantum State Not Found
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Looks like this page has been scattered across multiple dimensions.
            The quantum entanglement seems to have broken here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/"
              className="flex items-center gap-3 px-8 py-4 bg-quantum-primary text-background font-semibold rounded-lg hover:bg-quantum-secondary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-quantum-primary/25"
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-3 px-8 py-4 border border-quantum-primary text-quantum-primary font-semibold rounded-lg hover:bg-quantum-primary hover:text-background transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { to: "/", label: "Home", icon: Home },
              { to: "/work", label: "My Work", icon: Zap },
              { to: "/resume", label: "Resume", icon: Search },
              { to: "/blog", label: "Blog", icon: Search },
            ].map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="tech-card text-center hover:border-quantum-primary/50 transition-all duration-300 hover:scale-105"
              >
                <Icon className="w-6 h-6 mx-auto mb-2 text-quantum-primary" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Fun message */}
          <div className="mt-12 p-6 bg-card/30 rounded-xl max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Fun Fact:</strong> In quantum computing, superposition
              means a qubit can be in multiple states simultaneously. This page,
              however, is definitely in just one state: missing! 😄
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
