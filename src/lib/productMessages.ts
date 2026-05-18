export type ProductMessageKey =
  | 'network'
  | 'generic'
  | 'permission'
  | 'booking'
  | 'tickets'
  | 'profile'
  | 'profileLoad'
  | 'exhibits'
  | 'routes'
  | 'savedContent'
  | 'tryAgain';

const messages: Record<ProductMessageKey, { en: string; ar: string }> = {
  network: {
    en: "Connection issue. Please check your internet connection and try again.",
    ar: "\u062d\u062f\u062b\u062a \u0645\u0634\u0643\u0644\u0629 \u0641\u064a \u0627\u0644\u0627\u062a\u0635\u0627\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.",
  },
  generic: {
    en: "Something went wrong. Please try again.",
    ar: "\u062d\u062f\u062b \u062e\u0637\u0623 \u0645\u0627. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.",
  },
  permission: {
    en: "This content is currently unavailable.",
    ar: "\u0647\u0630\u0627 \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u062d\u0627\u0644\u064a\u0627\u064b.",
  },
  booking: {
    en: "We could not complete your booking. Please try again.",
    ar: "\u062a\u0639\u0630\u0631 \u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u062d\u062c\u0632. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.",
  },
  tickets: {
    en: "We could not load your tickets.",
    ar: "\u062a\u0639\u0630\u0631 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u062a\u0630\u0627\u0643\u0631 \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0643.",
  },
  profile: {
    en: "We could not update your profile.",
    ar: "\u062a\u0639\u0630\u0631 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a.",
  },
  profileLoad: {
    en: "We could not load your profile.",
    ar: "\u062a\u0639\u0630\u0631 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a.",
  },
  exhibits: {
    en: "Exhibit information is currently unavailable.",
    ar: "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0627\u062a \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u062d\u0627\u0644\u064a\u0627\u064b.",
  },
  routes: {
    en: "Recommended routes are currently unavailable.",
    ar: "\u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u0642\u062a\u0631\u062d\u0629 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u062d\u0627\u0644\u064a\u0627\u064b.",
  },
  savedContent: {
    en: "Showing available saved content.",
    ar: "\u064a\u062a\u0645 \u0639\u0631\u0636 \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0645\u062a\u0627\u062d \u0627\u0644\u0645\u062d\u0641\u0648\u0638.",
  },
  tryAgain: {
    en: "Try again",
    ar: "\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629",
  },
};

export function productMessage(key: ProductMessageKey, isRTL = false): string {
  return isRTL ? messages[key].ar : messages[key].en;
}

export function isConnectionError(error: unknown): boolean {
  const code = String((error as { code?: unknown })?.code ?? '').toLowerCase();
  const message = String((error as { message?: unknown })?.message ?? '').toLowerCase();
  return (
    code.includes('network') ||
    code.includes('unavailable') ||
    code.includes('deadline-exceeded') ||
    message.includes('network') ||
    message.includes('offline') ||
    message.includes('connection') ||
    message.includes('unavailable')
  );
}

export function isAccessError(error: unknown): boolean {
  const code = String((error as { code?: unknown })?.code ?? '').toLowerCase();
  const message = String((error as { message?: unknown })?.message ?? '').toLowerCase();
  return code.includes('permission') || message.includes('permission');
}
