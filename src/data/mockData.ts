import { Habit, MotivationalQuote } from '@/types/habit';

export const defaultHabits: Habit[] = [];

export const motivationalQuotes: MotivationalQuote[] = [
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "We are what we repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Unknown" },
  { text: "Your habits will determine your future.", author: "Jack Canfield" },
  { text: "First we make our habits, then our habits make us.", author: "John Dryden" },
  { text: "The chains of habit are too light to be felt until they are too heavy to be broken.", author: "Warren Buffett" },
];

export const habitSuggestions = [
  { name: 'Morning Stretch', icon: '🤸', category: 'fitness' as const },
  { name: 'Gratitude Journal', icon: '📝', category: 'mindfulness' as const },
  { name: 'Take Vitamins', icon: '💊', category: 'health' as const },
  { name: 'Learn a New Word', icon: '🔤', category: 'learning' as const },
  { name: 'No Social Media for 1 Hour', icon: '📵', category: 'productivity' as const },
  { name: 'Call a Friend', icon: '📞', category: 'social' as const },
  { name: 'Go for a Walk', icon: '🚶', category: 'fitness' as const },
  { name: 'Practice Deep Breathing', icon: '🌬️', category: 'mindfulness' as const },
];

export const categoryColors: Record<string, string> = {
  health: 'hsl(200 80% 50%)',
  fitness: 'hsl(15 85% 60%)',
  mindfulness: 'hsl(162 63% 41%)',
  productivity: 'hsl(38 92% 50%)',
  learning: 'hsl(280 60% 55%)',
  social: 'hsl(340 75% 55%)',
  other: 'hsl(220 15% 50%)',
};
