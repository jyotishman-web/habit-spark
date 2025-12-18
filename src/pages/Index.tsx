import { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { TodayView } from '@/components/views/TodayView';
import { CalendarView } from '@/components/views/CalendarView';
import { InsightsView } from '@/components/views/InsightsView';
import { StatsView } from '@/components/views/StatsView';
import { ProfileView } from '@/components/views/ProfileView';
import { useHabits } from '@/hooks/useHabits';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const {
    habits,
    completions,
    isLoading,
    addHabit,
    deleteHabit,
    toggleCompletion,
    getTodayProgress,
    getWeekProgress,
    getCompletionRate,
  } = useHabits();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 gradient-primary rounded-full animate-pulse mx-auto" />
          <p className="text-muted-foreground mt-4">Loading your habits...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <TodayView
            habits={habits}
            completions={completions}
            onToggleCompletion={toggleCompletion}
            onAddHabit={addHabit}
            progress={getTodayProgress()}
          />
        );
      case 'calendar':
        return (
          <CalendarView
            habits={habits}
            completions={completions}
            onToggleCompletion={toggleCompletion}
          />
        );
      case 'insights':
        return (
          <InsightsView
            habits={habits}
            completionRate={getCompletionRate()}
            weekProgress={getWeekProgress()}
          />
        );
      case 'stats':
        return (
          <StatsView
            habits={habits}
            completionRate={getCompletionRate()}
            weekProgress={getWeekProgress()}
          />
        );
      case 'profile':
        return (
          <ProfileView
            habits={habits}
            onDeleteHabit={deleteHabit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderView()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
