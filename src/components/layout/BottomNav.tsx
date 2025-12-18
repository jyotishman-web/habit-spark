import { Home, Calendar, BarChart3, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Today' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'insights', icon: Sparkles, label: 'Insights' },
  { id: 'stats', icon: BarChart3, label: 'Stats' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "relative flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200",
              activeTab === id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "relative p-2 rounded-xl transition-all duration-200",
              activeTab === id && "bg-primary/10"
            )}>
              <Icon className={cn(
                "w-5 h-5 transition-all",
                activeTab === id && "scale-110"
              )} strokeWidth={activeTab === id ? 2.5 : 2} />
              {activeTab === id && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-all",
              activeTab === id && "font-semibold"
            )}>{label}</span>
          </button>
        ))}
      </div>
      {/* Safe area padding for mobile */}
      <div className="h-safe-area-inset-bottom bg-card/80" />
    </nav>
  );
}