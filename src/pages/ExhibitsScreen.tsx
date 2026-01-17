import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Landmark, Search, X, Heart, Filter } from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { exhibits } from '@/lib/data';
import { cn } from '@/lib/utils';

type FilterCategory = 'all' | 'New Kingdom' | 'Middle Kingdom' | 'Ptolemaic Period';

const filterCategories: { key: FilterCategory; labelEn: string; labelAr: string }[] = [
  { key: 'all', labelEn: 'All', labelAr: 'الكل' },
  { key: 'New Kingdom', labelEn: 'New Kingdom', labelAr: 'المملكة الحديثة' },
  { key: 'Middle Kingdom', labelEn: 'Middle Kingdom', labelAr: 'المملكة الوسطى' },
  { key: 'Ptolemaic Period', labelEn: 'Ptolemaic', labelAr: 'العصر البطلمي' },
];

export default function ExhibitsScreen() {
  const navigate = useNavigate();
  const { language, isRTL, savedExhibits, toggleSavedExhibit } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredExhibits = useMemo(() => {
    return exhibits.filter(exhibit => {
      // Search filter
      const name = language === 'ar' ? exhibit.nameAr : exhibit.nameEn;
      const description = language === 'ar' ? exhibit.descriptionAr : exhibit.descriptionEn;
      const matchesSearch = searchQuery === '' || 
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = activeFilter === 'all' || exhibit.periodEn === activeFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeFilter, language]);

  return (
    <PageContainer>
      <AppBar 
        title={t('exhibitsList', language)} 
        showBack
        rightContent={
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/favorites')}
            className="relative"
          >
            <Heart className={cn(
              'w-5 h-5',
              savedExhibits.length > 0 && 'fill-primary text-primary'
            )} />
            {savedExhibits.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedExhibits.length}
              </span>
            )}
          </Button>
        }
      />

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className={cn(
            'absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground',
            isRTL ? 'right-3' : 'left-3'
          )} />
          <Input
            type="text"
            placeholder={language === 'ar' ? 'البحث عن معروضات...' : 'Search exhibits...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'h-12 rounded-xl bg-card border-border/50',
              isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors',
                isRTL ? 'left-3' : 'right-3'
              )}
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterCategories.map(({ key, labelEn, labelAr }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeFilter === key
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              )}
            >
              {language === 'ar' ? labelAr : labelEn}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          {language === 'ar' 
            ? `${filteredExhibits.length} معروض`
            : `${filteredExhibits.length} exhibit${filteredExhibits.length !== 1 ? 's' : ''}`
          }
        </p>

        {/* Exhibits List */}
        {filteredExhibits.length === 0 ? (
          <EmptyState
            icon={Search}
            title={language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            description={language === 'ar' 
              ? 'جرب البحث بكلمات مختلفة'
              : 'Try searching with different keywords'
            }
            actionLabel={language === 'ar' ? 'مسح البحث' : 'Clear search'}
            onAction={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
          />
        ) : (
          <div className="space-y-3">
            {filteredExhibits.map((exhibit, index) => {
              const isSaved = savedExhibits.includes(exhibit.id);
              
              return (
                <div
                  key={exhibit.id}
                  className={`flex items-center gap-3 w-full p-4 bg-card rounded-2xl shadow-soft opacity-0 animate-slide-up-fade stagger-${Math.min(index + 1, 6)}`}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <button
                    onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
                    className="flex items-center gap-4 flex-1 hover-lift press-effect group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                      <Landmark className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    
                    <div className={cn('flex-1', isRTL ? 'text-right' : 'text-left')}>
                      <h3 className="font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                        {language === 'ar' ? exhibit.nameAr : exhibit.nameEn}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {language === 'ar' ? exhibit.periodAr : exhibit.periodEn}
                      </p>
                    </div>

                    <ChevronRight className={cn(
                      'w-5 h-5 text-muted-foreground flex-shrink-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1',
                      isRTL && 'rotate-180 group-hover:-translate-x-1'
                    )} />
                  </button>

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSavedExhibit(exhibit.id)}
                    className="flex-shrink-0"
                  >
                    <Heart className={cn(
                      'w-5 h-5 transition-all duration-200',
                      isSaved 
                        ? 'fill-primary text-primary scale-110' 
                        : 'text-muted-foreground hover:text-primary'
                    )} />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageContainer>
  );
}

