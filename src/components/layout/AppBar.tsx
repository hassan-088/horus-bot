import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu, QrCode, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

interface AppBarProps {
  title: string;
  showBack?: boolean;
  showMenu?: boolean;
  showQR?: boolean;
  showTickets?: boolean;
  onMenuClick?: () => void;
  leftIcon?: ReactNode;
  rightContent?: ReactNode;
  className?: string;
}

export function AppBar({
  title,
  showBack,
  showMenu,
  showQR,
  showTickets,
  onMenuClick,
  leftIcon,
  rightContent,
  className,
}: AppBarProps) {
  const navigate = useNavigate();
  const { isRTL } = useApp();

  return (
    <header className={cn(
      'sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-sidebar/95 backdrop-blur-md border-b border-white/5',
      className
    )}>
      <div className="flex items-center gap-2">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-9 w-9 rounded-full"
          >
            <ArrowLeft className={cn('h-5 w-5', isRTL && 'rotate-180')} />
          </Button>
        )}
        {showMenu && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-9 w-9 rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {leftIcon}
        <h1 className="text-lg font-serif font-semibold truncate tracking-wide">{title}</h1>
      </div>
      
      <div className="flex items-center gap-1">
        {rightContent}
        {showQR && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/qr_scan')}
            className="h-9 w-9 rounded-full"
          >
            <QrCode className="h-5 w-5" />
          </Button>
        )}
        {showTickets && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/my_tickets')}
            className="h-9 w-9 rounded-full"
          >
            <Ticket className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
