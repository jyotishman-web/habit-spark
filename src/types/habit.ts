export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export type HabitCategory = 'health' | 'fitness' | 'mindfulness' | 'productivity' | 'learning' | 'social' | 'other';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  targetDays: number[]; // 0-6 for days of week
  reminderTime?: string;
  color: string;
  createdAt: Date;
  streak: number;
  longestStreak: number;
  completedDates: string[]; // ISO date strings
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
}

export interface DailyProgress {
  date: string;
  totalHabits: number;
  completedHabits: number;
  percentage: number;
}

export interface MotivationalQuote {
  text: string;
  author: string;
}
