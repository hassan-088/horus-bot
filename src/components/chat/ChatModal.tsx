import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const { language, isRTL } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
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

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('bathroom') || msg.includes('toilet') || msg.includes('restroom') || msg.includes('حمام')) {
      return language === 'ar'
        ? 'دورات المياه تقع بالقرب من المدخل الرئيسي على اليسار.'
        : 'The restrooms are located near the main entrance, on the left side.';
    }
    
    if (msg.includes('ticket') || msg.includes('price') || msg.includes('تذكرة') || msg.includes('سعر')) {
      return language === 'ar'
        ? 'يمكنك شراء التذاكر من قسم التذاكر في التطبيق. البالغون: 200 جنيه، الطلاب: 100 جنيه، الأطفال: 50 جنيه.'
        : 'You can purchase tickets from the Tickets section in the app. Adults: 200 EGP, Students: 100 EGP, Children: 50 EGP.';
    }
    
    if (msg.includes('open') || msg.includes('hour') || msg.includes('time') || msg.includes('ساعات') || msg.includes('مفتوح')) {
      return language === 'ar'
        ? 'المتحف مفتوح يومياً من 9 صباحاً حتى 6 مساءً.'
        : 'The museum is open daily from 9 AM to 6 PM.';
    }
    
    if (msg.includes('cafe') || msg.includes('food') || msg.includes('eat') || msg.includes('كافيه') || msg.includes('طعام')) {
      return language === 'ar'
        ? 'يوجد كافيه في الطابق الأرضي بالقرب من متجر الهدايا.'
        : 'There is a café on the ground floor near the gift shop.';
    }

    if (msg.includes('tutankhamun') || msg.includes('mask') || msg.includes('توت') || msg.includes('قناع')) {
      return language === 'ar'
        ? 'قناع توت عنخ آمون الذهبي موجود في القاعة أ. إنه من أشهر القطع الأثرية في العالم!'
        : 'The Golden Mask of Tutankhamun is in Hall A. It\'s one of the most famous artifacts in the world!';
    }
    
    return language === 'ar'
      ? 'أنا هنا للمساعدة! يمكنك سؤالي عن المعروضات، أوقات العمل، أو المرافق.'
      : 'I\'m here to help! You can ask me about exhibits, opening hours, or facilities.';
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
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
              <h2 className="font-semibold">{t('chatTitle', language)}</h2>
              <p className="text-xs text-muted-foreground">Horus-Bot / حورس-بوت</p>
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
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-2',
                message.isBot ? (isRTL ? 'flex-row-reverse' : 'flex-row') : (isRTL ? 'flex-row' : 'flex-row-reverse'),
                index === messages.length - 1 && (message.isBot ? 'animate-slide-in-left' : 'animate-slide-in-right')
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
            className="absolute bottom-20 right-4 rounded-full shadow-md h-8 w-8"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        )}

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
              className="flex-1 rounded-full bg-muted border-0 transition-shadow duration-300 focus:shadow-[0_0_0_2px_hsl(var(--primary)/0.3)]"
            />
            <Button
              type="submit"
              size="icon"
              className={cn(
                "rounded-full h-10 w-10 transition-all duration-300",
                input.trim() ? "hover:scale-110 hover:shadow-lg" : ""
              )}
              disabled={!input.trim()}
            >
              <Send className={cn('w-4 h-4 transition-transform duration-200', isRTL && 'rotate-180', input.trim() && 'hover:translate-x-0.5')} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
