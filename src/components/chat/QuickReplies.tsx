import { cn } from '@/lib/utils';
import { Clock, Ticket, MapPin, HelpCircle, Utensils } from 'lucide-react';

interface QuickReply {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ReactNode;
  message: string;
}

const quickReplies: QuickReply[] = [
  {
    id: 'hours',
    labelEn: 'Opening Hours',
    labelAr: 'ساعات العمل',
    icon: <Clock className="w-3.5 h-3.5" />,
    message: 'What are the museum opening hours?',
  },
  {
    id: 'tickets',
    labelEn: 'Ticket Prices',
    labelAr: 'أسعار التذاكر',
    icon: <Ticket className="w-3.5 h-3.5" />,
    message: 'How much do tickets cost?',
  },
  {
    id: 'restrooms',
    labelEn: 'Restrooms',
    labelAr: 'دورات المياه',
    icon: <MapPin className="w-3.5 h-3.5" />,
    message: 'Where are the restrooms?',
  },
  {
    id: 'cafe',
    labelEn: 'Café',
    labelAr: 'الكافيه',
    icon: <Utensils className="w-3.5 h-3.5" />,
    message: 'Is there a café in the museum?',
  },
  {
    id: 'tutankhamun',
    labelEn: 'Tutankhamun',
    labelAr: 'توت عنخ آمون',
    icon: <HelpCircle className="w-3.5 h-3.5" />,
    message: 'Tell me about the Golden Mask of Tutankhamun',
  },
];

interface QuickRepliesProps {
  language: 'en' | 'ar';
  onSelect: (message: string) => void;
  disabled?: boolean;
}

export function QuickReplies({ language, onSelect, disabled }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-border/50">
      {quickReplies.map((reply) => (
        <button
          key={reply.id}
          onClick={() => onSelect(reply.message)}
          disabled={disabled}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
            'bg-primary/10 text-primary hover:bg-primary/20 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {reply.icon}
          <span>{language === 'ar' ? reply.labelAr : reply.labelEn}</span>
        </button>
      ))}
    </div>
  );
}
