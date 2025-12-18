import { useState } from 'react';
import { Plus, Sparkles, Sun, Moon, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HabitCard } from '@/components/habits/HabitCard';
import { ProgressRing } from '@/components/habits/ProgressRing';
import { AddHabitDialog } from '@/components/habits/AddHabitDialog';
import { motivationalQuotes } from '@/data/mockData';
import { Habit } from '@/types/habit';

interface TodayViewProps {
  habits: Habit[];
  completions: Record<string, string[]>;
  onToggleCompletion: (habitId: string, date: string) => void;
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'longestStreak' | 'completedDates'>) => void;
  progress: { total: number; completed: number; percentage: number };
}

export function TodayView({ habits, completions, onToggleCompletion, onAddHabit, progress }: TodayViewProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const dayOfWeek = new Date().getDay();
  
  const todayHabits = habits.filter(h => h.targetDays.includes(dayOfWeek));
  
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const TimeIcon = hour < 18 ? Sun : Moon;

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero gradient-mesh" />
        <div className="relative pt-12 pb-8 px-5">
          <div className="max-w-lg mx-auto">
            {/* Greeting */}
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TimeIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{formatDate()}</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
              {greeting}
            </h1>
            
            {/* Progress Card */}
            <div className="mt-8 p-6 bg-card rounded-2xl shadow-card border border-border/50">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <ProgressRing percentage={progress.percentage} size={100} strokeWidth={8}>
                    <div className="text-center">
                      <span className="text-2xl font-display font-bold text-foreground">{progress.percentage}%</span>
                    </div>
                  </ProgressRing>
                  {progress.percentage === 100 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 gradient-accent rounded-full flex items-center justify-center animate-bounce-in shadow-glow-accent">
                      <Sparkles className="w-3 h-3 text-accent-foreground" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Daily Progress</p>
                  <p className="text-xl font-semibold text-foreground mt-1">
                    {progress.completed} of {progress.total}
                  </p>
                  <p className="text-sm text-muted-foreground">habits completed</p>
                  {progress.percentage === 100 && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Perfect day!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="px-5 -mt-2 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-sm text-foreground leading-relaxed">"{quote.text}"</p>
            <p className="text-xs text-muted-foreground mt-2 font-medium">— {quote.author}</p>
          </div>
        </div>
      </div>

      {/* Habits List */}
      <div className="px-5 mt-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground">Today's Habits</h2>
              <p className="text-sm text-muted-foreground">{todayHabits.length} habits scheduled</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddDialog(true)}
              className="gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          {todayHabits.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                <Target className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">Start Your Journey</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                Create your first habit and begin building the life you want, one day at a time.
              </p>
              <Button 
                className="mt-6 gap-2 gradient-primary border-0 shadow-glow" 
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="w-4 h-4" />
                Create Your First Habit
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayHabits.map((habit, index) => (
                <div 
                  key={habit.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <HabitCard
                    habit={habit}
                    isCompleted={(completions[habit.id] || []).includes(today)}
                    onToggle={() => onToggleCompletion(habit.id, today)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      {todayHabits.length > 0 && (
        <button
          onClick={() => setShowAddDialog(true)}
          className="fixed right-5 bottom-24 w-14 h-14 gradient-primary rounded-full shadow-lg shadow-primary/25 flex items-center justify-center text-primary-foreground hover:brightness-110 transition-all active:scale-95 hover:scale-105"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      <AddHabitDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={onAddHabit}
      />
    </div>
  );
}