import { Sparkles, TrendingUp, Lightbulb, Flame, Target, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Habit } from '@/types/habit';
import { habitSuggestions, motivationalQuotes } from '@/data/mockData';

interface InsightsViewProps {
  habits: Habit[];
  completionRate: number;
  weekProgress: { date: string; completed: number; total: number }[];
}

export function InsightsView({ habits, completionRate, weekProgress }: InsightsViewProps) {
  const generateInsights = () => {
    const insights: { icon: React.ReactNode; title: string; description: string; type: 'tip' | 'motivation' | 'warning' }[] = [];
    
    if (completionRate >= 80) {
      insights.push({
        icon: <Flame className="w-5 h-5" />,
        title: "Outstanding Performance",
        description: `You're crushing it with ${completionRate}% completion! Your consistency is building powerful neural pathways.`,
        type: 'motivation',
      });
    } else if (completionRate >= 50) {
      insights.push({
        icon: <TrendingUp className="w-5 h-5" />,
        title: "Building Momentum",
        description: `${completionRate}% completion rate. Try habit stacking—attach new habits to existing routines for better results.`,
        type: 'tip',
      });
    } else {
      insights.push({
        icon: <Target className="w-5 h-5" />,
        title: "Start Small, Think Big",
        description: "Focus on just 1-2 habits first. Consistency beats intensity—small wins compound into major transformations.",
        type: 'warning',
      });
    }

    const longestStreak = Math.max(...habits.map(h => h.streak), 0);
    if (longestStreak > 7) {
      insights.push({
        icon: <Zap className="w-5 h-5" />,
        title: `${longestStreak}-Day Streak Active`,
        description: "You're past the critical 7-day mark. Research shows habits become automatic around day 66. Keep going!",
        type: 'motivation',
      });
    }

    const hour = new Date().getHours();
    if (hour < 12) {
      insights.push({
        icon: <Lightbulb className="w-5 h-5" />,
        title: "Peak Performance Window",
        description: "Morning cortisol levels are optimal for habit execution. Your willpower is at its strongest right now.",
        type: 'tip',
      });
    } else if (hour >= 18) {
      insights.push({
        icon: <Lightbulb className="w-5 h-5" />,
        title: "Evening Ritual Time",
        description: "End your day strong. Evening habits create a powerful feedback loop for tomorrow's success.",
        type: 'tip',
      });
    }

    return insights;
  };

  const insights = generateInsights();
  const suggestions = habitSuggestions.slice(0, 4);
  const quote = motivationalQuotes[Math.floor(Date.now() / 86400000) % motivationalQuotes.length];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero gradient-mesh" />
        <div className="relative pt-12 pb-6 px-5">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">AI Insights</h1>
                <p className="text-sm text-muted-foreground">Personalized guidance for your journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6 -mt-2">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Today's Quote */}
          <div className="relative p-6 gradient-primary rounded-2xl text-primary-foreground shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <p className="text-xs font-semibold opacity-80 mb-3 uppercase tracking-wider">Daily Motivation</p>
            <p className="text-lg font-medium leading-relaxed relative z-10">"{quote.text}"</p>
            <p className="text-sm opacity-80 mt-4 font-medium">— {quote.author}</p>
          </div>

          {/* AI Insights */}
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Your Insights</h2>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-xl border border-border/50 shadow-card animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      insight.type === 'motivation'
                        ? 'bg-success/10 text-success'
                        : insight.type === 'warning'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Habit Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Suggested Habits</h2>
              <Button variant="ghost" size="sm" className="text-primary gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-xl border border-border/50 shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all cursor-pointer group"
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">
                    {suggestion.icon}
                  </div>
                  <h3 className="font-medium text-foreground text-sm leading-tight">{suggestion.name}</h3>
                  <span className="text-xs text-muted-foreground capitalize mt-1 block">{suggestion.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Pattern */}
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Weekly Pattern</h2>
            <div className="p-5 bg-card rounded-xl border border-border/50 shadow-card">
              <div className="flex items-end justify-between gap-2 h-32">
                {weekProgress.map((day, index) => {
                  const height = day.total > 0 ? (day.completed / day.total) * 100 : 0;
                  const date = new Date(day.date);
                  const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
                  const isToday = day.date === new Date().toISOString().split('T')[0];
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className={`w-full h-24 bg-secondary rounded-lg flex items-end overflow-hidden ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                        <div
                          className="w-full gradient-primary rounded-lg transition-all duration-500"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className={`text-xs ${isToday ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                        {dayLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}