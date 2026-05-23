export const TOUR_NARRATION_LANGUAGES = [
  { id: 'english', en: 'English', ar: 'الإنجليزية' },
  { id: 'arabic', en: 'Arabic', ar: 'العربية' },
  { id: 'french', en: 'French', ar: 'الفرنسية' },
  { id: 'german', en: 'German', ar: 'الألمانية' },
  { id: 'spanish', en: 'Spanish', ar: 'الإسبانية' },
  { id: 'italian', en: 'Italian', ar: 'الإيطالية' },
  { id: 'korean', en: 'Korean', ar: 'الكورية' },
  { id: 'chinese', en: 'Chinese', ar: 'الصينية' },
  { id: 'japanese', en: 'Japanese', ar: 'اليابانية' },
  { id: 'other', en: 'Other', ar: 'أخرى' },
] as const;

export type TourNarrationLanguage = (typeof TOUR_NARRATION_LANGUAGES)[number]['id'];

const TOUR_NARRATION_LANGUAGE_IDS = new Set<string>(
  TOUR_NARRATION_LANGUAGES.map((language) => language.id),
);

export function isSupportedTourNarrationLanguage(value: string | null | undefined): value is TourNarrationLanguage {
  return TOUR_NARRATION_LANGUAGE_IDS.has(String(value ?? '').trim().toLowerCase().replaceAll('-', '_'));
}

export function normalizeTourNarrationLanguage(value: string | null | undefined): TourNarrationLanguage | null {
  const normalized = String(value ?? '').trim().toLowerCase().replaceAll('-', '_');
  return isSupportedTourNarrationLanguage(normalized) ? normalized : null;
}

export function tourNarrationLanguageLabel(
  value: string | null | undefined,
  isArabic: boolean,
  otherValue?: string | null,
) {
  const normalized = normalizeTourNarrationLanguage(value);
  if (normalized === 'other' && otherValue?.trim()) return otherValue.trim();
  const language = TOUR_NARRATION_LANGUAGES.find((item) => item.id === normalized);
  if (!language) return isArabic ? 'اللغة المختارة' : 'Selected language';
  return isArabic ? language.ar : language.en;
}
