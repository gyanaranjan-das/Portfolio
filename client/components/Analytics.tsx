import { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, Clock } from 'lucide-react';

interface AnalyticsData {
  totalVisitors: number;
  todayVisitors: number;
  pageViews: number;
  avgTimeOnSite: string;
  topPages: { page: string; views: number }[];
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 1247,
    todayVisitors: 23,
    pageViews: 3891,
    avgTimeOnSite: '2m 34s',
    topPages: [
      { page: 'Home', views: 1543 },
      { page: 'Blog', views: 892 },
      { page: 'Work', views: 634 },
      { page: 'Resume', views: 456 }
    ]
  });

  useEffect(() => {
    // Simulate real-time analytics updates
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        todayVisitors: prev.todayVisitors + Math.floor(Math.random() * 3),
        pageViews: prev.pageViews + Math.floor(Math.random() * 5) + 1,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 2)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tech-card">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-quantum-primary" />
        Live Analytics
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-quantum-primary/10 rounded-lg">
          <Users className="w-6 h-6 mx-auto mb-2 text-quantum-primary" />
          <div className="text-2xl font-bold text-quantum-primary">{analytics.totalVisitors.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Visitors</div>
        </div>
        
        <div className="text-center p-4 bg-quantum-secondary/10 rounded-lg">
          <div className="text-2xl font-bold text-quantum-secondary">{analytics.todayVisitors}</div>
          <div className="text-sm text-muted-foreground">Today</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">Live</span>
          </div>
        </div>
        
        <div className="text-center p-4 bg-quantum-accent/10 rounded-lg">
          <Eye className="w-6 h-6 mx-auto mb-2 text-quantum-accent" />
          <div className="text-2xl font-bold text-quantum-accent">{analytics.pageViews.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Page Views</div>
        </div>
        
        <div className="text-center p-4 bg-muted/10 rounded-lg">
          <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
          <div className="text-2xl font-bold text-foreground">{analytics.avgTimeOnSite}</div>
          <div className="text-sm text-muted-foreground">Avg. Time</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Top Pages</h4>
        <div className="space-y-2">
          {analytics.topPages.map((page, index) => (
            <div key={page.page} className="flex items-center justify-between">
              <span className="text-sm font-medium">{page.page}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-quantum-primary rounded-full transition-all duration-1000"
                    style={{ width: `${(page.views / analytics.topPages[0].views) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{page.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
