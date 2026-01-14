import { useState } from 'react';
import { Bot } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { ChatModal } from './ChatModal';
import { cn } from '@/lib/utils';

export function FloatingChatButton() {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-[88px] right-4 z-40 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-elevated transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 group animate-glow-pulse"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring pointer-events-none" />
        
        <Bot className={cn(
          "w-5 h-5 transition-transform duration-300",
          isHovered && "animate-wiggle"
        )} />
        <span className="text-sm font-medium whitespace-nowrap">{t('talkToAnkhu', language)}</span>
        
        {/* Tooltip on hover */}
        <div className={cn(
          "absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-300 pointer-events-none",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        )}>
          {language === 'ar' ? 'كيف يمكنني المساعدة؟' : 'How can I help?'}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-foreground rotate-45" />
        </div>
      </button>

      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
