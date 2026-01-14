import { useState } from 'react';
import { Bot } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { ChatModal } from './ChatModal';

export function FloatingChatButton() {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-elevated hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <Bot className="w-5 h-5" />
        <span className="text-sm font-medium">{t('talkToAnkhu', language)}</span>
      </button>

      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
