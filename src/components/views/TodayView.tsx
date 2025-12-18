import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
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
  
  // Get random quote
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="gradient-hero pt-12 pb-8 px-5">
        <div className="max-w-lg mx-auto">
          <p className="text-sm text-muted-foreground font-medium">{formatDate()}</p>
          <h1 className="text-2xl font-bold text-foreground mt-1">Today's Habits</h1>
          
          {/* Progress Card */}
          <div className="mt-6 p-6 bg-card rounded-3xl shadow-card">
            <div className="flex items-center gap-6">
              <ProgressRing percentage={progress.percentage} size={100} strokeWidth={10}>
                <div className="text-center">
                  <span className="text-2xl font-bold text-foreground">{progress.percentage}%</span>
                </div>
              </ProgressRing>
              
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Daily Progress</p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {progress.completed} of {progress.total} completed
                </p>
                {progress.percentage === 100 && (
                  <p className="text-sm text-primary font-medium mt-2 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Perfect day! Keep it up!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="px-5 -mt-2">
        <div className="max-w-lg mx-auto">
          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-sm text-foreground italic">"{quote.text}"</p>
            <p className="text-xs text-muted-foreground mt-2">— {quote.author}</p>
          </div>
        </div>
      </div>

      {/* Habits List */}
      <div className="px-5 mt-6">
        <div className="max-w-lg mx-auto space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Your Habits</h2>
            <Button
              variant="soft"
              size="sm"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          {todayHabits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-foreground">No habits for today</h3>
              <p className="text-sm text-muted-foreground mt-1">Create your first habit to get started!</p>
              <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4" />
                Create Habit
              </Button>
            </div>
          ) : (
            todayHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={(completions[habit.id] || []).includes(today)}
                onToggle={() => onToggleCompletion(habit.id, today)}
              />
            ))
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddDialog(true)}
        className="fixed right-5 bottom-24 w-14 h-14 gradient-primary rounded-full shadow-lg flex items-center justify-center text-primary-foreground hover:brightness-110 transition-all active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AddHabitDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={onAddHabit}
      />
    </div>
  );
}
