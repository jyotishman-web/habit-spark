import { useState } from 'react';
import { User, Bell, Trash2, Settings, Share2, Moon, Sun, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Habit } from '@/types/habit';
import { cn } from '@/lib/utils';

interface ProfileViewProps {
  habits: Habit[];
  onDeleteHabit: (id: string) => void;
}

export function ProfileView({ habits, onDeleteHabit }: ProfileViewProps) {
  const [notifications, setNotifications] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const totalDays = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / 86400000);
  const completedCount = habits.reduce((sum, h) => sum + h.completedDates.length, 0);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="gradient-hero pt-12 pb-6 px-5">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your habits and settings</p>
        </div>
      </div>

      <div className="px-5 space-y-6">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Profile Card */}
          <div className="bg-card rounded-3xl shadow-card p-6 text-center">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mt-4">Habit Builder</h2>
            <p className="text-sm text-muted-foreground mt-1">Building better habits daily</p>
            
            <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{habits.length}</p>
                <p className="text-xs text-muted-foreground">Habits</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{totalDays}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{Math.max(...habits.map(h => h.longestStreak), 0)}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-card rounded-3xl shadow-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Settings</h3>
            </div>
            
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Bell className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-foreground">Notifications</span>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent/10 text-accent">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-foreground">Share Progress</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-secondary text-secondary-foreground">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-foreground">Preferences</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Manage Habits */}
          <div className="bg-card rounded-3xl shadow-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Manage Habits</h3>
            </div>
            
            <div className="divide-y divide-border">
              {habits.map((habit) => (
                <div key={habit.id} className="p-4">
                  {showDeleteConfirm === habit.id ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-destructive">Delete this habit?</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDeleteConfirm(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            onDeleteHabit(habit.id);
                            setShowDeleteConfirm(null);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{habit.icon}</span>
                        <div>
                          <p className="font-medium text-foreground">{habit.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{habit.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowDeleteConfirm(habit.id)}
                        className="p-2 rounded-xl hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {habits.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No habits yet. Create your first one!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
