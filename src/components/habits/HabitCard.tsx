import { Check, Flame } from 'lucide-react';
import { Habit } from '@/types/habit';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  onToggle: () => void;
}

export function HabitCard({ habit, isCompleted, onToggle }: HabitCardProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card transition-all duration-300 animate-fade-in",
        "hover:shadow-card-hover cursor-pointer group",
        isCompleted && "bg-primary/5"
      )}
      onClick={onToggle}
    >
      {/* Completion checkbox */}
      <button
        className={cn(
          "relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
          isCompleted
            ? "gradient-primary shadow-glow"
            : "border-2 border-border hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        {isCompleted ? (
          <Check className="w-6 h-6 text-primary-foreground animate-scale-in" />
        ) : (
          <span className="text-2xl group-hover:scale-110 transition-transform">{habit.icon}</span>
        )}
      </button>

      {/* Habit info */}
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-semibold text-foreground truncate transition-all",
          isCompleted && "line-through text-muted-foreground"
        )}>
          {habit.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="px-2 py-0.5 text-xs font-medium rounded-full"
            style={{ 
              backgroundColor: `${habit.color}20`,
              color: habit.color 
            }}
          >
            {habit.category}
          </span>
          {habit.reminderTime && (
            <span className="text-xs text-muted-foreground">
              {habit.reminderTime}
            </span>
          )}
        </div>
      </div>

      {/* Streak indicator */}
      {habit.streak > 0 && (
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/10 text-accent">
          <Flame className="w-4 h-4" />
          <span className="text-sm font-bold">{habit.streak}</span>
        </div>
      )}
    </div>
  );
}
