import { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { exhibits, Exhibit } from '@/lib/data';
import { cn } from '@/lib/utils';

interface MapSearchProps {
  language: 'en' | 'ar';
  onSelectExhibit: (exhibit: Exhibit) => void;
}

const categories = [
  { id: 'all', labelEn: 'All', labelAr: 'الكل' },
  { id: 'hall-a', labelEn: 'Hall A', labelAr: 'القاعة أ' },
  { id: 'hall-b', labelEn: 'Hall B', labelAr: 'القاعة ب' },
  { id: 'hall-c', labelEn: 'Hall C', labelAr: 'القاعة ج' },
];

export function MapSearch({ language, onSelectExhibit }: MapSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredExhibits = useMemo(() => {
    return exhibits.filter((exhibit) => {
      const name = language === 'ar' ? exhibit.nameAr : exhibit.nameEn;
      const gallery = exhibit.galleryEn.toLowerCase();
      const matchesQuery = query === '' || name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = activeFilter === 'all' || gallery.includes(activeFilter.replace('hall-', 'hall '));
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter, language]);

  const handleSelect = (exhibit: Exhibit) => {
    onSelectExhibit(exhibit);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed top-20 left-4 right-4 z-40">
      {/* Search bar */}
      <div className="glass rounded-2xl shadow-card overflow-hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={language === 'ar' ? 'ابحث عن معروض...' : 'Search exhibits...'}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="pl-10 pr-10 h-12 border-0 bg-transparent text-sm"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        
        {/* Category filters */}
        <div className="flex gap-2 px-3 pb-3 pt-1 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeFilter === cat.id ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-3 text-xs rounded-full flex-shrink-0"
              onClick={() => setActiveFilter(cat.id)}
            >
              {language === 'ar' ? cat.labelAr : cat.labelEn}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Results dropdown */}
      {isOpen && (query || activeFilter !== 'all') && (
        <div className="mt-2 glass rounded-2xl shadow-elevated max-h-64 overflow-y-auto">
          {filteredExhibits.length > 0 ? (
            <div className="p-2">
              {filteredExhibits.map((exhibit) => (
                <button
                  key={exhibit.id}
                  onClick={() => handleSelect(exhibit)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl transition-colors',
                    'hover:bg-primary/10 text-left'
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Filter className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' ? exhibit.galleryAr : exhibit.galleryEn}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
