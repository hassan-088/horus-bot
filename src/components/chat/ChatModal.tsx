import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { QuickReplies } from './QuickReplies';
import { ExhibitCard } from './ExhibitCard';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  exhibitId?: string; // For rich media cards
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Detect if message mentions an exhibit
function detectExhibitMention(text: string): string | null {
  const mentions: Record<string, string[]> = {
    'golden-mask': ['tutankhamun', 'golden mask', 'قناع', 'توت عنخ', 'hall a', 'القاعة أ'],
    'rosetta-stone': ['rosetta', 'رشيد', 'hall b', 'القاعة ب', 'hieroglyph'],
    'ancient-vase': ['vase', 'ceremonial', 'إناء', 'hall c', 'القاعة ج'],
    'scarab-amulet': ['scarab', 'amulet', 'جعران', 'تميمة', 'khepri'],
    'papyrus-scroll': ['papyrus', 'book of the dead', 'بردية', 'كتاب الموتى'],
  };

  const lowerText = text.toLowerCase();
  for (const [exhibitId, keywords] of Object.entries(mentions)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return exhibitId;
    }
  }
  return null;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const { language, isRTL } = useApp();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{role: string; content: string}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            text: t('chatGreeting', language),
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen, language, messages.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Update conversation history
    const newHistory = [...conversationHistory, { role: 'user', content: text }];
    setConversationHistory(newHistory);

    try {
      const { data, error } = await supabase.functions.invoke('horus-chat', {
        body: { messages: newHistory },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const botResponse = data.response;
      const exhibitId = detectExhibitMention(botResponse);

      // Update conversation history with bot response
      setConversationHistory(prev => [...prev, { role: 'assistant', content: botResponse }]);

      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
        exhibitId,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'ar' 
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.' 
          : 'Sorry, something went wrong. Please try again.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        variant: 'destructive',
        description: error instanceof Error ? error.message : 'Failed to get response',
      });
    }
  };

  const handleQuickReply = (message: string) => {
    sendMessage(message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg h-[80vh] max-h-[600px] bg-card rounded-2xl shadow-elevated flex flex-col overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center animate-glow-pulse">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold flex items-center gap-1.5">
                {t('chatTitle', language)}
                <Sparkles className="w-4 h-4 text-warning" />
              </h2>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered'}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
        >
          {messages.map((message, index) => (
            <div key={message.id}>
              <div
                className={cn(
                  'flex items-end gap-2',
                  message.isBot ? (isRTL ? 'flex-row-reverse' : 'flex-row') : (isRTL ? 'flex-row' : 'flex-row-reverse'),
                  index === messages.length - 1 && !isTyping && (message.isBot ? 'animate-slide-in-left' : 'animate-slide-in-right')
                )}
              >
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                  message.isBot ? 'bg-primary/10' : 'bg-muted'
                )}>
                  {message.isBot ? (
                    <Bot className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[75%] px-4 py-2.5 rounded-2xl',
                    message.isBot
                      ? 'bg-muted text-foreground rounded-bl-sm'
                      : 'bg-primary text-primary-foreground rounded-br-sm'
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
              
              {/* Rich media card for exhibits */}
              {message.isBot && message.exhibitId && (
                <div className={cn('mt-2', isRTL ? 'mr-9' : 'ml-9')}>
                  <ExhibitCard exhibitId={message.exhibitId} language={language} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className={cn(
              'flex items-end gap-2',
              isRTL ? 'flex-row-reverse' : 'flex-row'
            )}>
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot-delay-1" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot-delay-2" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <Button
            variant="secondary"
            size="icon"
            onClick={scrollToBottom}
            className="absolute bottom-36 right-4 rounded-full shadow-md h-8 w-8"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        )}

        {/* Quick Replies */}
        <QuickReplies 
          language={language} 
          onSelect={handleQuickReply}
          disabled={isTyping}
        />

        {/* Input */}
        <div className="p-4 border-t border-border bg-gradient-to-r from-card to-muted/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('typeMessage', language)}
              disabled={isTyping}
              className="flex-1 rounded-full bg-muted border-0 transition-shadow duration-300 focus:shadow-[0_0_0_2px_hsl(var(--primary)/0.3)]"
            />
            <Button
              type="submit"
              size="icon"
              className={cn(
                "rounded-full h-10 w-10 transition-all duration-300",
                input.trim() ? "hover:scale-110 hover:shadow-lg" : ""
              )}
              disabled={!input.trim() || isTyping}
            >
              <Send className={cn('w-4 h-4 transition-transform duration-200', isRTL && 'rotate-180')} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
