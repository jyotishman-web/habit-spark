import { Trophy, Flame, Target, TrendingUp, Calendar, Award } from 'lucide-react';
import { Habit } from '@/types/habit';
import { ProgressRing } from '@/components/habits/ProgressRing';

interface StatsViewProps {
  habits: Habit[];
  completionRate: number;
  weekProgress: { date: string; completed: number; total: number }[];
}

export function StatsView({ habits, completionRate, weekProgress }: StatsViewProps) {
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const longestStreak = Math.max(...habits.map(h => h.longestStreak), 0);
  const totalHabits = habits.length;
  const weeklyCompleted = weekProgress.reduce((sum, d) => sum + d.completed, 0);

  const stats = [
    {
      icon: <Flame className="w-5 h-5" />,
      value: totalStreak,
      label: 'Total Streaks',
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      value: longestStreak,
      label: 'Best Streak',
      color: 'bg-warning/10 text-warning',
    },
    {
      icon: <Target className="w-5 h-5" />,
      value: totalHabits,
      label: 'Active Habits',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      value: weeklyCompleted,
      label: 'This Week',
      color: 'bg-success/10 text-success',
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero gradient-mesh" />
        <div className="relative pt-12 pb-6 px-5">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">Statistics</h1>
                <p className="text-sm text-muted-foreground">Your habit journey in numbers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6 -mt-2">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Overall Completion */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-card p-6">
            <div className="flex items-center gap-6">
              <ProgressRing percentage={completionRate} size={110} strokeWidth={10}>
                <div className="text-center">
                  <span className="text-2xl font-display font-bold text-foreground">{completionRate}%</span>
                </div>
              </ProgressRing>
              <div>
                <h3 className="text-lg font-display font-semibold text-foreground">Overall Completion</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Last 30 days performance</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-success" />
                  </div>
                  <span className="text-sm font-medium text-success">On track</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border/50 shadow-card p-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-display font-bold text-foreground mt-3">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Habit Breakdown */}
          {habits.length > 0 && (
            <div className="bg-card rounded-2xl border border-border/50 shadow-card p-5">
              <h3 className="text-lg font-display font-semibold text-foreground mb-5">Habit Performance</h3>
              <div className="space-y-5">
                {habits.map((habit) => {
                  const percentage = habit.longestStreak > 0
                    ? Math.round((habit.streak / habit.longestStreak) * 100)
                    : 0;
                  
                  return (
                    <div key={habit.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{habit.icon}</span>
                          <span className="font-medium text-foreground text-sm">{habit.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {habit.streak}/{habit.longestStreak}
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: habit.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Weekly Trend */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-card p-5">
            <h3 className="text-lg font-display font-semibold text-foreground mb-5">This Week</h3>
            <div className="flex items-center justify-between gap-2">
              {weekProgress.map((day, index) => {
                const date = new Date(day.date);
                const isToday = day.date === new Date().toISOString().split('T')[0];
                const percentage = day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0;
                
                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      percentage === 100
                        ? 'gradient-success text-success-foreground shadow-sm'
                        : percentage > 0
                        ? 'bg-warning/15 text-warning'
                        : 'bg-secondary text-muted-foreground'
                    } ${isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' : ''}`}>
                      {percentage}%
                    </div>
                    <span className={`text-xs ${isToday ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}