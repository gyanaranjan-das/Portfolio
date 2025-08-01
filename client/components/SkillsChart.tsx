import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Code2, Brain, Atom } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  experience: string;
  projects: number;
}

const skillsData: Skill[] = [
  {
    name: "Python",
    level: 95,
    category: "Programming",
    icon: "🐍",
    experience: "2+ years",
    projects: 8,
  },
  {
    name: "JavaScript",
    level: 90,
    category: "Programming",
    icon: "💛",
    experience: "2 years",
    projects: 6,
  },
  {
    name: "Java",
    level: 85,
    category: "Programming",
    icon: "☕",
    experience: "1.5 years",
    projects: 4,
  },
  {
    name: "React",
    level: 88,
    category: "Frontend",
    icon: "⚛️",
    experience: "1.5 years",
    projects: 5,
  },
  {
    name: "TensorFlow",
    level: 80,
    category: "AI/ML",
    icon: "🧠",
    experience: "1 year",
    projects: 3,
  },
  {
    name: "PyTorch",
    level: 75,
    category: "AI/ML",
    icon: "🔥",
    experience: "1 year",
    projects: 2,
  },
  {
    name: "Qiskit",
    level: 70,
    category: "Quantum",
    icon: "⚛️",
    experience: "8 months",
    projects: 2,
  },
  {
    name: "Docker",
    level: 82,
    category: "DevOps",
    icon: "🐳",
    experience: "1 year",
    projects: 4,
  },
  {
    name: "AWS",
    level: 78,
    category: "Cloud",
    icon: "☁️",
    experience: "10 months",
    projects: 3,
  },
  {
    name: "MongoDB",
    level: 85,
    category: "Database",
    icon: "🍃",
    experience: "1.5 years",
    projects: 5,
  },
];

const categories = [
  "All",
  "Programming",
  "Frontend",
  "AI/ML",
  "Quantum",
  "DevOps",
  "Cloud",
  "Database",
];

export default function SkillsChart() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [animationProgress, setAnimationProgress] = useState(0);

  const filteredSkills =
    selectedCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === selectedCategory);

  useEffect(() => {
    // Animate skill bars on mount or category change
    setAnimationProgress(0);
    const timer = setTimeout(() => setAnimationProgress(100), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming":
        return <Code2 className="w-4 h-4" />;
      case "AI/ML":
        return <Brain className="w-4 h-4" />;
      case "Quantum":
        return <Atom className="w-4 h-4" />;
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  const getSkillColor = (level: number) => {
    if (level >= 90) return "from-green-500 to-green-400";
    if (level >= 80) return "from-blue-500 to-blue-400";
    if (level >= 70) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  return (
    <div className="tech-card">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-quantum-primary" />
        <h3 className="text-xl font-bold">Skills Proficiency</h3>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-quantum-primary text-background"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {getCategoryIcon(category)}
            {category}
          </button>
        ))}
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-lg">{skill.icon}</span>
                <div>
                  <span className="font-medium text-foreground">
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{skill.experience}</span>
                    <span>•</span>
                    <span>{skill.projects} projects</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-foreground">
                  {skill.level}%
                </span>
                <div className="text-xs text-muted-foreground">
                  {skill.category}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000 ease-out rounded-full relative`}
                  style={{
                    width: `${(animationProgress / 100) * skill.level}%`,
                    transition: "width 1s ease-out",
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>

              {/* Skill level indicator */}
              <div
                className="absolute top-0 h-3 w-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  left: `${skill.level}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-quantum-primary">
              {Math.round(
                filteredSkills.reduce((acc, skill) => acc + skill.level, 0) /
                  filteredSkills.length,
              )}
              %
            </div>
            <div className="text-xs text-muted-foreground">
              Avg. Proficiency
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-quantum-secondary">
              {filteredSkills.reduce((acc, skill) => acc + skill.projects, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-quantum-accent">
              {filteredSkills.length}
            </div>
            <div className="text-xs text-muted-foreground">Technologies</div>
          </div>
        </div>
      </div>
    </div>
  );
}
