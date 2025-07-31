import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Quantum Grid Background */}
      <div className="absolute inset-0 bg-quantum-grid opacity-20" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-quantum-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* 3D Wireframe Globe */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 animate-rotate-3d">
            {/* Globe rings */}
            <div className="absolute inset-0 border-2 border-quantum-primary rounded-full opacity-80" />
            <div className="absolute inset-2 border-2 border-quantum-secondary rounded-full opacity-60 animate-pulse" />
            <div className="absolute inset-4 border-2 border-quantum-accent rounded-full opacity-40" />
            
            {/* Orbital rings */}
            <div className="absolute inset-0 border border-quantum-primary rounded-full animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-0 border border-quantum-secondary rounded-full animate-spin" style={{ animationDuration: '12s', transform: 'rotateX(60deg)' }} />
            <div className="absolute inset-0 border border-quantum-accent rounded-full animate-spin" style={{ animationDuration: '16s', transform: 'rotateY(60deg)' }} />
          </div>
          
          {/* Central "G" Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="text-4xl font-bold text-quantum-primary animate-pulse-glow">G</span>
              <div className="absolute inset-0 text-4xl font-bold text-quantum-primary opacity-50 animate-ping" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground animate-fade-in-up">
            Initializing Quantum Systems...
          </h2>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-quantum-primary via-quantum-secondary to-quantum-accent transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {progress}% Complete
            </div>
          </div>

          {/* Loading Messages */}
          <div className="text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {progress < 25 && "Loading AI/ML frameworks..."}
            {progress >= 25 && progress < 50 && "Initializing quantum circuits..."}
            {progress >= 50 && progress < 75 && "Connecting to cloud services..."}
            {progress >= 75 && progress < 100 && "Finalizing system architecture..."}
            {progress >= 100 && "Welcome to the future!"}
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-quantum-primary opacity-30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-quantum-secondary opacity-30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-quantum-accent opacity-30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-quantum-primary opacity-30" />
    </div>
  );
}
