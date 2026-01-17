import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  Check,
  Route,
  Timer,
  Accessibility,
  Baby,
  GraduationCap,
  Landmark
} from 'lucide-react';
import { AppBar } from '@/components/layout/AppBar';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useApp } from '@/contexts/AppContext';
import { exhibits, Exhibit } from '@/lib/data';
import { cn } from '@/lib/utils';

type Interest = 'pharaohs' | 'mummies' | 'daily-life' | 'art' | 'religion';
type VisitorType = 'general' | 'family' | 'student' | 'accessibility';

const interests: { key: Interest; labelEn: string; labelAr: string; icon: string }[] = [
  { key: 'pharaohs', labelEn: 'Pharaohs & Royalty', labelAr: 'الفراعنة والملوك', icon: '👑' },
  { key: 'mummies', labelEn: 'Mummies & Afterlife', labelAr: 'المومياوات والآخرة', icon: '⚰️' },
  { key: 'daily-life', labelEn: 'Daily Life', labelAr: 'الحياة اليومية', icon: '🏺' },
  { key: 'art', labelEn: 'Art & Sculpture', labelAr: 'الفن والنحت', icon: '🎨' },
  { key: 'religion', labelEn: 'Religion & Gods', labelAr: 'الدين والآلهة', icon: '🏛️' },
];

const visitorTypes: { key: VisitorType; labelEn: string; labelAr: string; icon: typeof Landmark }[] = [
  { key: 'general', labelEn: 'General', labelAr: 'عام', icon: Landmark },
  { key: 'family', labelEn: 'Family', labelAr: 'عائلة', icon: Baby },
  { key: 'student', labelEn: 'Student', labelAr: 'طالب', icon: GraduationCap },
  { key: 'accessibility', labelEn: 'Accessibility', labelAr: 'سهولة الوصول', icon: Accessibility },
];

// Map exhibits to interests (simplified mapping)
const exhibitInterests: Record<string, Interest[]> = {
  'golden-mask': ['pharaohs', 'art'],
  'rosetta-stone': ['pharaohs', 'daily-life'],
  'ancient-vase': ['daily-life', 'art', 'religion'],
  'scarab-amulet': ['religion', 'art'],
  'papyrus-scroll': ['religion', 'mummies'],
};

export default function TourPlannerScreen() {
  const navigate = useNavigate();
  const { language, isRTL } = useApp();
  
  const [step, setStep] = useState<'interests' | 'time' | 'type' | 'result'>('interests');
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [availableTime, setAvailableTime] = useState(60); // minutes
  const [visitorType, setVisitorType] = useState<VisitorType>('general');

  const isArabic = language === 'ar';

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Generate personalized tour based on selections
  const recommendedExhibits = useMemo(() => {
    let filtered = exhibits;
    
    // Filter by interests if any selected
    if (selectedInterests.length > 0) {
      filtered = exhibits.filter(exhibit => {
        const exhibitTags = exhibitInterests[exhibit.id] || [];
        return exhibitTags.some(tag => selectedInterests.includes(tag));
      });
    }

    // If no matches, show all
    if (filtered.length === 0) {
      filtered = exhibits;
    }

    // Limit by time (assume ~15 min per exhibit)
    const maxExhibits = Math.floor(availableTime / 15);
    filtered = filtered.slice(0, Math.max(maxExhibits, 2));

    // Sort by floor for efficient routing
    return filtered.sort((a, b) => {
      const floorOrder = { 'ground': 0, 'floor-1': 1, 'floor-2': 2 };
      return floorOrder[a.floor] - floorOrder[b.floor];
    });
  }, [selectedInterests, availableTime]);

  const estimatedDuration = recommendedExhibits.length * 15;

  const texts = {
    title: isArabic ? 'خطط جولتك' : 'Plan Your Tour',
    interestsTitle: isArabic ? 'ما الذي يثير اهتمامك؟' : "What interests you?",
    interestsSubtitle: isArabic ? 'اختر موضوعاً واحداً أو أكثر' : 'Select one or more topics',
    timeTitle: isArabic ? 'كم لديك من الوقت؟' : 'How much time do you have?',
    minutes: isArabic ? 'دقيقة' : 'minutes',
    typeTitle: isArabic ? 'نوع الزيارة' : 'Visit Type',
    typeSubtitle: isArabic ? 'سنخصص الجولة لاحتياجاتك' : "We'll customize for your needs",
    next: isArabic ? 'التالي' : 'Next',
    back: isArabic ? 'رجوع' : 'Back',
    generateTour: isArabic ? 'إنشاء الجولة' : 'Generate Tour',
    yourTour: isArabic ? 'جولتك المخصصة' : 'Your Custom Tour',
    exhibits: isArabic ? 'معروضات' : 'exhibits',
    startTour: isArabic ? 'ابدأ الجولة' : 'Start Tour',
    viewOnMap: isArabic ? 'عرض على الخريطة' : 'View on Map',
    estimatedTime: isArabic ? 'الوقت المقدر' : 'Estimated time',
  };

  const renderStep = () => {
    switch (step) {
      case 'interests':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">{texts.interestsTitle}</h2>
              <p className="text-muted-foreground">{texts.interestsSubtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {interests.map(({ key, labelEn, labelAr, icon }) => {
                const isSelected = selectedInterests.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => toggleInterest(key)}
                    className={cn(
                      'relative p-4 rounded-2xl border-2 transition-all duration-200 text-center',
                      isSelected 
                        ? 'border-primary bg-primary/10 shadow-md' 
                        : 'border-border bg-card hover:border-primary/50'
                    )}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <span className="text-2xl mb-2 block">{icon}</span>
                    <span className="text-sm font-medium">
                      {isArabic ? labelAr : labelEn}
                    </span>
                  </button>
                );
              })}
            </div>

            <Button 
              className="w-full h-12 rounded-xl"
              onClick={() => setStep('time')}
            >
              {texts.next}
              <ChevronRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            </Button>
          </div>
        );

      case 'time':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">{texts.timeTitle}</h2>
            </div>

            <div className="space-y-6 px-2">
              <div className="flex items-center justify-center gap-2">
                <Timer className="w-6 h-6 text-primary" />
                <span className="text-4xl font-bold text-primary">{availableTime}</span>
                <span className="text-lg text-muted-foreground">{texts.minutes}</span>
              </div>

              <Slider
                value={[availableTime]}
                onValueChange={([v]) => setAvailableTime(v)}
                min={30}
                max={180}
                step={15}
                className="mt-6"
              />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>30 {texts.minutes}</span>
                <span>180 {texts.minutes}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 h-12 rounded-xl"
                onClick={() => setStep('interests')}
              >
                {texts.back}
              </Button>
              <Button 
                className="flex-1 h-12 rounded-xl"
                onClick={() => setStep('type')}
              >
                {texts.next}
                <ChevronRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        );

      case 'type':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">{texts.typeTitle}</h2>
              <p className="text-muted-foreground">{texts.typeSubtitle}</p>
            </div>

            <div className="space-y-3">
              {visitorTypes.map(({ key, labelEn, labelAr, icon: Icon }) => {
                const isSelected = visitorType === key;
                return (
                  <button
                    key={key}
                    onClick={() => setVisitorType(key)}
                    className={cn(
                      'flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all duration-200',
                      isSelected 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border bg-card hover:border-primary/50'
                    )}
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium flex-1 text-left rtl:text-right">
                      {isArabic ? labelAr : labelEn}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 h-12 rounded-xl"
                onClick={() => setStep('time')}
              >
                {texts.back}
              </Button>
              <Button 
                className="flex-1 h-12 rounded-xl"
                onClick={() => setStep('result')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {texts.generateTour}
              </Button>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="space-y-6 animate-fade-in-up">
            {/* Header Card */}
            <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl text-center">
              <Route className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">{texts.yourTour}</h2>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Landmark className="w-4 h-4" />
                  {recommendedExhibits.length} {texts.exhibits}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~{estimatedDuration} {texts.minutes}
                </span>
              </div>
            </div>

            {/* Route List */}
            <div className="space-y-3">
              {recommendedExhibits.map((exhibit, index) => (
                <div
                  key={exhibit.id}
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft"
                  onClick={() => navigate(`/exhibit_details?id=${exhibit.id}`)}
                >
                  {/* Step Number */}
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {isArabic ? exhibit.nameAr : exhibit.nameEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? exhibit.galleryAr : exhibit.galleryEn}
                    </p>
                  </div>

                  <ChevronRight className={cn('w-5 h-5 text-muted-foreground', isRTL && 'rotate-180')} />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 h-12 rounded-xl"
                onClick={() => navigate('/map')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {texts.viewOnMap}
              </Button>
              <Button 
                className="flex-1 h-12 rounded-xl"
                onClick={() => navigate(`/exhibit_details?id=${recommendedExhibits[0]?.id}`)}
              >
                {texts.startTour}
                <ChevronRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
              </Button>
            </div>

            <Button 
              variant="ghost"
              className="w-full"
              onClick={() => setStep('interests')}
            >
              {isArabic ? 'إنشاء جولة جديدة' : 'Create New Tour'}
            </Button>
          </div>
        );
    }
  };

  return (
    <PageContainer>
      <AppBar title={texts.title} showBack />
      
      {/* Progress Indicator */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex gap-2">
          {['interests', 'time', 'type', 'result'].map((s, i) => (
            <div 
              key={s}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors duration-300',
                i <= ['interests', 'time', 'type', 'result'].indexOf(step)
                  ? 'bg-primary'
                  : 'bg-muted'
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        {renderStep()}
      </div>
    </PageContainer>
  );
}
