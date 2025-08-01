import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Eye, Heart, MessageCircle, User, Tag, Share2, ArrowLeft } from "lucide-react";
import { blogManager, BlogPost as BlogPostType, Comment } from "../lib/blogData";
import { cn } from "../lib/utils";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (slug) {
      const foundPost = blogManager.getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        setLikes(foundPost.likes);
        setViews(foundPost.views);
        setLiked(blogManager.hasUserLikedPost(foundPost.id));

        // Increment view count
        blogManager.incrementViews(foundPost.id);

        // Set up real-time updates
        const updateInterval = setInterval(() => {
          const updatedPost = blogManager.getPostBySlug(slug);
          if (updatedPost) {
            setLikes(updatedPost.likes);
            setViews(updatedPost.views);
            setPost(updatedPost);
          }
        }, 3000); // Update every 3 seconds

        return () => clearInterval(updateInterval);
      }
    }
  }, [slug]);

  const handleLike = () => {
    if (post && !liked) {
      const success = blogManager.likePost(post.id);
      if (success) {
        setLiked(true);
        setLikes(prev => prev + 1);
      }
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (post && newComment.trim() && commentAuthor.trim()) {
      const success = blogManager.addComment(post.id, {
        author: commentAuthor,
        avatar: "👤",
        content: newComment
      });
      if (success) {
        setNewComment("");
        setCommentAuthor("");
        // Refresh post to show new comment
        const updatedPost = blogManager.getPostBySlug(slug!);
        if (updatedPost) setPost(updatedPost);
      }
    }
  };

  const handleCommentLike = (commentId: string) => {
    if (post) {
      const success = blogManager.likeComment(post.id, commentId);
      if (success) {
        // Refresh post to show updated likes
        const updatedPost = blogManager.getPostBySlug(slug!);
        if (updatedPost) setPost(updatedPost);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return `<h1 class="text-3xl font-bold mt-8 mb-4">${paragraph.slice(2)}</h1>`;
        }
        if (paragraph.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold mt-6 mb-3">${paragraph.slice(3)}</h2>`;
        }
        if (paragraph.startsWith('### ')) {
          return `<h3 class="text-xl font-bold mt-4 mb-2">${paragraph.slice(4)}</h3>`;
        }
        if (paragraph.startsWith('```')) {
          const lines = paragraph.split('\n');
          const language = lines[0].slice(3);
          const code = lines.slice(1, -1).join('\n');
          return `<div class="bg-muted rounded-lg p-4 my-4 overflow-x-auto"><pre class="text-sm"><code class="language-${language}">${code}</code></pre></div>`;
        }
        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
          const items = paragraph.split('\n').map(line => 
            line.startsWith('- ') || line.startsWith('* ') 
              ? `<li class="ml-4">${line.slice(2)}</li>` 
              : line
          ).join('');
          return `<ul class="list-disc ml-6 my-4">${items}</ul>`;
        }
        return `<p class="mb-4 leading-relaxed">${paragraph}</p>`;
      })
      .join('');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-quantum-primary hover:text-quantum-secondary">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-quantum-primary hover:text-quantum-secondary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 text-xs bg-quantum-primary/20 text-quantum-primary px-2 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between border-t border-b border-border/50 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="text-2xl">{post.authorAvatar}</div>
                <div>
                  <div className="font-medium text-foreground">{post.author}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{views}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                  liked 
                    ? "bg-red-500/20 text-red-400" 
                    : "bg-card/50 text-muted-foreground hover:text-quantum-primary"
                )}
              >
                <Heart className={cn("w-4 h-4", liked && "fill-current")} />
                <span>{likes}</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-card/50 text-muted-foreground hover:text-quantum-primary rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-quantum-primary prose-code:bg-quantum-primary/10 prose-code:rounded prose-code:px-1"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Comments Section */}
        <section className="mt-16 border-t border-border/50 pt-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Comments ({post.comments.length})
          </h2>

          {/* Comment Form */}
          <div className="bg-card/30 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Join the Discussion</h3>
            <form onSubmit={handleComment} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-quantum-primary/50 focus:border-quantum-primary"
                  required
                />
                <div className="flex items-center text-muted-foreground text-sm">
                  <User className="w-4 h-4 mr-2" />
                  Your name will be public
                </div>
              </div>
              <textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-quantum-primary/50 focus:border-quantum-primary resize-none"
                required
              />
              <button
                type="submit"
                className="bg-quantum-primary text-background px-6 py-3 rounded-lg hover:bg-quantum-secondary transition-colors font-medium"
              >
                Post Comment
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-card/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{comment.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-foreground">{comment.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-quantum-primary transition-colors">
                        <Heart className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-sm text-muted-foreground hover:text-quantum-primary transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-12 mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-background/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-lg">{reply.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground text-sm">{reply.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(reply.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Posts */}
        <section className="mt-16 border-t border-border/50 pt-12">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogManager.getPostsByCategory(post.category)
              .filter(p => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="tech-card group"
                >
                  {relatedPost.coverImage && (
                    <div className="h-48 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={relatedPost.coverImage} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-foreground group-hover:text-quantum-primary transition-colors line-clamp-2 mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </article>
    </div>
  );
}
