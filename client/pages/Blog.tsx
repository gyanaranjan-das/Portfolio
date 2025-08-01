import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Clock, Eye, Heart, MessageCircle, Calendar, User, Tag } from "lucide-react";
import { blogManager, BlogPost } from "../lib/blogData";
import { cn } from "../lib/utils";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "most-viewed">("newest");
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const categories = ["All", ...blogManager.getAllCategories()];
  const tags = blogManager.getAllTags();

  useEffect(() => {
    const loadPosts = () => {
      const allPosts = blogManager.getAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
      setLastUpdate(Date.now());
    };

    loadPosts();

    // Subscribe to real-time updates
    const unsubscribe = blogManager.subscribeToUpdates(loadPosts);
    return unsubscribe;
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    // Sort posts
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "most-viewed":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        break;
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, selectedTag, sortBy]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => (
    <article className={cn(
      "group bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-quantum-primary/20 hover:-translate-y-1",
      featured && "lg:col-span-2 lg:row-span-2"
    )}>
      {post.coverImage && (
        <div className={cn("relative overflow-hidden", featured ? "h-64" : "h-48")}>
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {post.featured && (
            <div className="absolute top-4 left-4 bg-quantum-primary text-background px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className={cn("p-6", featured && "lg:p-8")}>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h2 className={cn(
              "font-bold text-foreground group-hover:text-quantum-primary transition-colors line-clamp-2",
              featured ? "text-2xl lg:text-3xl" : "text-xl"
            )}>
              <Link to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
          </div>

          <p className={cn(
            "text-muted-foreground line-clamp-3",
            featured ? "text-base lg:text-lg" : "text-sm"
          )}>
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, featured ? 4 : 3).map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="inline-flex items-center gap-1 text-xs bg-quantum-primary/20 text-quantum-primary px-2 py-1 rounded-full hover:bg-quantum-primary/30 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments.length}</span>
              </div>
            </div>
            
            <Link 
              to={`/blog/${post.slug}`}
              className="text-quantum-primary hover:text-quantum-secondary transition-colors font-medium text-sm"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
              <Link to="/work" className="text-muted-foreground hover:text-foreground transition-colors">
                Work
              </Link>
              <Link to="/resume" className="text-muted-foreground hover:text-foreground transition-colors">
                Resume
              </Link>
              <Link to="/blog" className="text-quantum-primary">
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
            <span className="text-foreground">Tech</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-primary via-quantum-secondary to-quantum-accent ml-4">
              Insights
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring the cutting edge of AI, quantum computing, and system architecture. 
            Join the conversation and share your thoughts!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-card/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-quantum-primary/50 focus:border-quantum-primary transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-quantum-primary/50"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-card/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-quantum-primary/50"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="most-viewed">Most Viewed</option>
            </select>

            {/* Clear Filters */}
            {(selectedCategory !== "All" || selectedTag || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag("");
                  setSearchTerm("");
                }}
                className="text-sm text-quantum-primary hover:text-quantum-secondary transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Active Tags */}
          {selectedTag && (
            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-quantum-primary/20 text-quantum-primary px-3 py-1 rounded-full text-sm">
                <Tag className="w-3 h-3" />
                {selectedTag}
                <button
                  onClick={() => setSelectedTag("")}
                  className="ml-1 hover:text-quantum-secondary"
                >
                  ×
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          {regularPosts.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold mb-8 text-center">
                {featuredPosts.length > 0 ? "Latest Articles" : "All Articles"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag("");
                  setSearchTerm("");
                }}
                className="bg-quantum-primary text-background px-6 py-3 rounded-lg hover:bg-quantum-secondary transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : null}
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center bg-card/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have thoughts on AI, quantum computing, or system architecture? 
            I'd love to hear from you! Connect with me and let's discuss the future of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#contact"
              className="bg-quantum-primary text-background px-8 py-3 rounded-lg hover:bg-quantum-secondary transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-quantum-primary text-quantum-primary px-8 py-3 rounded-lg hover:bg-quantum-primary hover:text-background transition-all duration-300"
            >
              Follow on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
