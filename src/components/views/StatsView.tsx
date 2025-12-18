import { Trophy, Flame, Target, TrendingUp, Calendar } from 'lucide-react';
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
  const weeklyTotal = weekProgress.reduce((sum, d) => sum + d.total, 0);

  const stats = [
    {
      icon: <Flame className="w-6 h-6" />,
      value: totalStreak,
      label: 'Total Streaks',
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: longestStreak,
      label: 'Best Streak',
      color: 'bg-warning/10 text-warning',
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: totalHabits,
      label: 'Active Habits',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      value: weeklyCompleted,
      label: 'This Week',
      color: 'bg-success/10 text-success',
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="gradient-hero pt-12 pb-6 px-5">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Statistics</h1>
          <p className="text-sm text-muted-foreground mt-1">Your habit journey in numbers</p>
        </div>
      </div>

      <div className="px-5 space-y-6">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Overall Completion */}
          <div className="bg-card rounded-3xl shadow-card p-6">
            <div className="flex items-center gap-6">
              <ProgressRing percentage={completionRate} size={120} strokeWidth={12}>
                <div className="text-center">
                  <span className="text-3xl font-bold text-foreground">{completionRate}%</span>
                </div>
              </ProgressRing>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Overall Completion</h3>
                <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
                <div className="flex items-center gap-1 mt-3 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Keep it up!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl shadow-card p-4 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-foreground mt-3">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Habit Breakdown */}
          <div className="bg-card rounded-3xl shadow-card p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">Habit Performance</h3>
            <div className="space-y-4">
              {habits.map((habit) => {
                const percentage = habit.longestStreak > 0
                  ? Math.round((habit.streak / habit.longestStreak) * 100)
                  : 0;
                
                return (
                  <div key={habit.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{habit.icon}</span>
                        <span className="font-medium text-foreground text-sm">{habit.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {habit.streak} / {habit.longestStreak} days
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
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

          {/* Weekly Trend */}
          <div className="bg-card rounded-3xl shadow-card p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">This Week</h3>
            <div className="flex items-center justify-between gap-2">
              {weekProgress.map((day, index) => {
                const date = new Date(day.date);
                const isToday = day.date === new Date().toISOString().split('T')[0];
                const percentage = day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0;
                
                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold ${
                      percentage === 100
                        ? 'bg-success text-success-foreground'
                        : percentage > 0
                        ? 'bg-warning/20 text-warning'
                        : 'bg-secondary text-muted-foreground'
                    } ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                      {percentage}%
                    </div>
                    <span className="text-xs text-muted-foreground">
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
