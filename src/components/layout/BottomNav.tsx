import { Home, Calendar, BarChart3, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Today' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'insights', icon: Sparkles, label: 'AI Insights' },
  { id: 'stats', icon: BarChart3, label: 'Stats' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200",
              activeTab === id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-xl transition-all duration-200",
              activeTab === id && "bg-primary/10"
            )}>
              <Icon className={cn(
                "w-5 h-5 transition-transform",
                activeTab === id && "scale-110"
              )} />
            </div>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
      {/* Safe area padding for mobile */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
}
