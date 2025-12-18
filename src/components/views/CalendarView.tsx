import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Habit } from '@/types/habit';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  habits: Habit[];
  completions: Record<string, string[]>;
  onToggleCompletion: (habitId: string, date: string) => void;
}

export function CalendarView({ habits, completions, onToggleCompletion }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatMonth = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDateString = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}-${String(day).padStart(2, '0')}`;
  };

  const getCompletionForDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    const dayHabits = habits.filter(h => h.targetDays.includes(dayOfWeek));
    const completed = dayHabits.filter(h => (completions[h.id] || []).includes(dateStr)).length;
    
    if (dayHabits.length === 0) return null;
    return { completed, total: dayHabits.length, percentage: Math.round((completed / dayHabits.length) * 100) };
  };

  const selectedDayOfWeek = new Date(selectedDate).getDay();
  const selectedHabits = habits.filter(h => h.targetDays.includes(selectedDayOfWeek));

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="gradient-hero pt-12 pb-6 px-5">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your progress over time</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-5 -mt-2">
        <div className="max-w-lg mx-auto">
          <div className="bg-card rounded-3xl shadow-card p-5">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="text-lg font-semibold text-foreground">{formatMonth()}</h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = getDateString(day);
                const completion = getCompletionForDate(dateStr);
                const isSelected = dateStr === selectedDate;
                const isToday = dateStr === today;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={cn(
                      "aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all relative",
                      isSelected
                        ? "gradient-primary text-primary-foreground shadow-card"
                        : isToday
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-secondary"
                    )}
                  >
                    <span className={cn("font-medium", isSelected ? "text-primary-foreground" : "text-foreground")}>
                      {day}
                    </span>
                    {completion && !isSelected && (
                      <div
                        className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: completion.percentage === 100
                            ? 'hsl(var(--success))'
                            : completion.percentage > 0
                            ? 'hsl(var(--warning))'
                            : 'hsl(var(--muted))'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Day Habits */}
      <div className="px-5 mt-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </h3>
          
          {selectedHabits.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No habits scheduled for this day</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedHabits.map((habit) => {
                const isCompleted = (completions[habit.id] || []).includes(selectedDate);
                return (
                  <div
                    key={habit.id}
                    onClick={() => onToggleCompletion(habit.id, selectedDate)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-2xl bg-card shadow-card cursor-pointer transition-all",
                      isCompleted && "opacity-60"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        isCompleted
                          ? "bg-success text-success-foreground"
                          : "border-2 border-border"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-lg">{habit.icon}</span>
                      )}
                    </div>
                    <span className={cn(
                      "font-medium text-foreground",
                      isCompleted && "line-through text-muted-foreground"
                    )}>
                      {habit.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
