import { cn } from '@/lib/utils';
import ankhImage from '@/assets/ankh.png';

interface HorusAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  glowing?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const iconSizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-10 h-10',
  xl: 'w-14 h-14',
};

export function HorusAvatar({
  size = 'md',
  animated = false,
  glowing = false,
  className,
  onClick,
}: HorusAvatarProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center rounded-full',
        'bg-gradient-to-br from-primary via-primary to-horus-glow',
        sizeClasses[size],
        animated && 'animate-float-gentle',
        glowing && 'shadow-horus animate-pulse-glow',
        onClick && 'cursor-pointer hover-scale press-effect',
        className
      )}
    >
      {/* Inner glow ring */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary-foreground/20 to-transparent" />
      
      {/* Icon */}
      <img
        src={ankhImage}
        alt="Horus-Bot"
        className={cn(
          'relative z-10 drop-shadow-lg',
          iconSizeClasses[size],
          animated && 'animate-breathe'
        )}
      />
      
      {/* Outer pulse ring when glowing */}
      {glowing && (
        <div className="absolute inset-0 rounded-full border-2 border-horus-glow/50 animate-pulse-ring" />
      )}
    </div>
  );
}
