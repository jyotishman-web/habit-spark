import { useState, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { defaultHabits } from '@/data/mockData';

const STORAGE_KEY = 'habitflow_habits';
const COMPLETIONS_KEY = 'habitflow_completions';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const storedHabits = localStorage.getItem(STORAGE_KEY);
    const storedCompletions = localStorage.getItem(COMPLETIONS_KEY);
    
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    } else {
      setHabits(defaultHabits);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHabits));
    }
    
    if (storedCompletions) {
      setCompletions(JSON.parse(storedCompletions));
    }
    
    setIsLoading(false);
  }, []);

  const saveHabits = (newHabits: Habit[]) => {
    setHabits(newHabits);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
  };

  const saveCompletions = (newCompletions: Record<string, string[]>) => {
    setCompletions(newCompletions);
    localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(newCompletions));
  };

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'longestStreak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date(),
      streak: 0,
      longestStreak: 0,
      completedDates: [],
    };
    saveHabits([...habits, newHabit]);
    return newHabit;
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    const updated = habits.map(h => h.id === id ? { ...h, ...updates } : h);
    saveHabits(updated);
  };

  const deleteHabit = (id: string) => {
    saveHabits(habits.filter(h => h.id !== id));
    const newCompletions = { ...completions };
    delete newCompletions[id];
    saveCompletions(newCompletions);
  };

  const toggleCompletion = (habitId: string, date: string) => {
    const habitCompletions = completions[habitId] || [];
    const isCompleted = habitCompletions.includes(date);
    
    let newHabitCompletions: string[];
    if (isCompleted) {
      newHabitCompletions = habitCompletions.filter(d => d !== date);
    } else {
      newHabitCompletions = [...habitCompletions, date];
    }
    
    const newCompletions = {
      ...completions,
      [habitId]: newHabitCompletions,
    };
    saveCompletions(newCompletions);

    // Update streak
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      const streak = calculateStreak(habitId, newHabitCompletions);
      updateHabit(habitId, { 
        streak,
        longestStreak: Math.max(habit.longestStreak, streak)
      });
    }
  };

  const isCompleted = (habitId: string, date: string): boolean => {
    return (completions[habitId] || []).includes(date);
  };

  const calculateStreak = (habitId: string, completionDates: string[]): number => {
    if (completionDates.length === 0) return 0;
    
    const sorted = [...completionDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Check if today or yesterday is completed
    if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
    
    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      const current = new Date(sorted[i - 1]);
      const prev = new Date(sorted[i]);
      const diff = (current.getTime() - prev.getTime()) / 86400000;
      
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getTodayProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayHabits = habits.filter(h => {
      const dayOfWeek = new Date().getDay();
      return h.targetDays.includes(dayOfWeek);
    });
    
    const completed = todayHabits.filter(h => isCompleted(h.id, today)).length;
    
    return {
      total: todayHabits.length,
      completed,
      percentage: todayHabits.length > 0 ? Math.round((completed / todayHabits.length) * 100) : 0,
    };
  };

  const getWeekProgress = () => {
    const days: { date: string; completed: number; total: number }[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();
      
      const dayHabits = habits.filter(h => h.targetDays.includes(dayOfWeek));
      const completed = dayHabits.filter(h => isCompleted(h.id, dateStr)).length;
      
      days.push({
        date: dateStr,
        completed,
        total: dayHabits.length,
      });
    }
    
    return days;
  };

  const getCompletionRate = (days: number = 30) => {
    let totalExpected = 0;
    let totalCompleted = 0;
    
    for (let i = 0; i < days; i++) {
      const date = new Date(Date.now() - i * 86400000);
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();
      
      habits.forEach(h => {
        if (h.targetDays.includes(dayOfWeek)) {
          totalExpected++;
          if (isCompleted(h.id, dateStr)) {
            totalCompleted++;
          }
        }
      });
    }
    
    return totalExpected > 0 ? Math.round((totalCompleted / totalExpected) * 100) : 0;
  };

  return {
    habits,
    completions,
    isLoading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getTodayProgress,
    getWeekProgress,
    getCompletionRate,
  };
}
