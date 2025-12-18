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
        "relative flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 shadow-card transition-all duration-300",
        "hover:shadow-card-hover cursor-pointer group",
        isCompleted && "bg-success/5 border-success/20"
      )}
      onClick={onToggle}
    >
      {/* Completion checkbox */}
      <button
        className={cn(
          "relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
          isCompleted
            ? "gradient-success shadow-lg"
            : "border-2 border-border bg-secondary/50 hover:border-primary/40 hover:bg-primary/5"
        )}
      >
        {isCompleted ? (
          <Check className="w-5 h-5 text-success-foreground animate-scale-in" strokeWidth={3} />
        ) : (
          <span className="text-2xl group-hover:scale-110 transition-transform">{habit.icon}</span>
        )}
      </button>

      {/* Habit info */}
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-semibold text-foreground truncate transition-all",
          isCompleted && "text-success"
        )}>
          {habit.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className="px-2 py-0.5 text-xs font-medium rounded-md capitalize"
            style={{ 
              backgroundColor: `${habit.color}15`,
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
        <div className={cn(
          "flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-sm transition-all",
          habit.streak >= 7 
            ? "bg-accent/10 text-accent" 
            : "bg-warning/10 text-warning"
        )}>
          <Flame className="w-4 h-4" />
          <span>{habit.streak}</span>
        </div>
      )}

      {/* Completion indicator line */}
      <div className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300",
        isCompleted ? "bg-success" : "bg-transparent"
      )} />
    </div>
  );
}