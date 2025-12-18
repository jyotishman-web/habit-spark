import { Sparkles, TrendingUp, Lightbulb, Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Habit } from '@/types/habit';
import { habitSuggestions, motivationalQuotes } from '@/data/mockData';

interface InsightsViewProps {
  habits: Habit[];
  completionRate: number;
  weekProgress: { date: string; completed: number; total: number }[];
}

export function InsightsView({ habits, completionRate, weekProgress }: InsightsViewProps) {
  // Generate AI-like insights based on data
  const generateInsights = () => {
    const insights: { icon: React.ReactNode; title: string; description: string; type: 'tip' | 'motivation' | 'warning' }[] = [];
    
    // Analyze completion rate
    if (completionRate >= 80) {
      insights.push({
        icon: <Flame className="w-5 h-5" />,
        title: "You're on fire! 🔥",
        description: `Amazing ${completionRate}% completion rate! You're building strong habits. Keep this momentum going!`,
        type: 'motivation',
      });
    } else if (completionRate >= 50) {
      insights.push({
        icon: <TrendingUp className="w-5 h-5" />,
        title: "Good progress",
        description: `You're completing ${completionRate}% of your habits. Try setting specific times for each habit to boost consistency.`,
        type: 'tip',
      });
    } else {
      insights.push({
        icon: <Target className="w-5 h-5" />,
        title: "Room to grow",
        description: "Start with just 1-2 habits and build from there. Small wins lead to big changes!",
        type: 'warning',
      });
    }

    // Analyze streaks
    const longestStreak = Math.max(...habits.map(h => h.streak), 0);
    if (longestStreak > 7) {
      insights.push({
        icon: <Flame className="w-5 h-5" />,
        title: `${longestStreak} day streak!`,
        description: "You're crushing it! Research shows it takes 66 days to form a habit. Keep going!",
        type: 'motivation',
      });
    }

    // Time-based insights
    const hour = new Date().getHours();
    if (hour < 12) {
      insights.push({
        icon: <Lightbulb className="w-5 h-5" />,
        title: "Morning momentum",
        description: "Great time to complete your morning habits. Studies show willpower is highest in the morning!",
        type: 'tip',
      });
    } else if (hour >= 18) {
      insights.push({
        icon: <Lightbulb className="w-5 h-5" />,
        title: "Evening check-in",
        description: "Don't forget your evening habits! A good night routine sets you up for tomorrow's success.",
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
      <div className="gradient-hero pt-12 pb-6 px-5">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Personalized tips to boost your habits</p>
        </div>
      </div>

      <div className="px-5 space-y-6">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Today's Quote */}
          <div className="p-5 gradient-primary rounded-3xl text-primary-foreground shadow-card">
            <p className="text-xs font-medium opacity-80 mb-2">TODAY'S MOTIVATION</p>
            <p className="text-lg font-medium leading-relaxed">"{quote.text}"</p>
            <p className="text-sm opacity-80 mt-3">— {quote.author}</p>
          </div>

          {/* AI Insights */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Insights</h2>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-2xl shadow-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${
                      insight.type === 'motivation'
                        ? 'bg-success/10 text-success'
                        : insight.type === 'warning'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {insight.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Habit Suggestions */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Suggested Habits</h2>
            <p className="text-sm text-muted-foreground mb-4">Based on your goals, try adding these:</p>
            <div className="grid grid-cols-2 gap-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {suggestion.icon}
                  </div>
                  <h3 className="font-medium text-foreground text-sm">{suggestion.name}</h3>
                  <span className="text-xs text-muted-foreground capitalize">{suggestion.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Pattern */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Pattern</h2>
            <div className="p-5 bg-card rounded-3xl shadow-card">
              <div className="flex items-end justify-between gap-2 h-32">
                {weekProgress.map((day, index) => {
                  const height = day.total > 0 ? (day.completed / day.total) * 100 : 0;
                  const date = new Date(day.date);
                  const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full h-24 bg-secondary rounded-lg flex items-end overflow-hidden">
                        <div
                          className="w-full gradient-primary rounded-lg transition-all duration-500"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{dayLabel}</span>
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
