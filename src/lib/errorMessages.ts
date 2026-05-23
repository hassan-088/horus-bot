import { isConnectionError, productMessage } from './productMessages';

type LocalizedMessage = { en: string; ar: string };

const authMessages: Record<string, LocalizedMessage> = {
  'auth/email-already-in-use': {
    en: 'An account already exists with this email. Please log in instead.',
    ar: 'يوجد حساب بهذا البريد الإلكتروني. يرجى تسجيل الدخول بدلاً من إنشاء حساب جديد.',
  },
  'auth/invalid-email': {
    en: 'Please enter a valid email address.',
    ar: 'يرجى إدخال بريد إلكتروني صحيح.',
  },
  'auth/weak-password': {
    en: 'Please use a stronger password.',
    ar: 'يرجى استخدام كلمة مرور أقوى.',
  },
  'auth/operation-not-allowed': {
    en: 'Something went wrong. Please check your connection and try again.',
    ar: 'حدث خطأ ما. يرجى التحقق من الاتصال والمحاولة مرة أخرى.',
  },
  'auth/network-request-failed': {
    en: 'Something went wrong. Please check your connection and try again.',
    ar: 'حدث خطأ ما. يرجى التحقق من الاتصال والمحاولة مرة أخرى.',
  },
  'auth/user-not-found': {
    en: 'No account was found with this email. Please create an account first.',
    ar: 'لا يوجد حساب بهذا البريد الإلكتروني. يرجى إنشاء حساب أولاً.',
  },
  'auth/wrong-password': {
    en: 'The password is incorrect. Please try again.',
    ar: 'كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.',
  },
  'auth/invalid-credential': {
    en: 'No account was found with this email. Please create an account first.',
    ar: 'لا يوجد حساب بهذا البريد الإلكتروني. يرجى إنشاء حساب أولاً.',
  },
  'auth/too-many-requests': {
    en: 'Too many attempts. Please wait a moment and try again.',
    ar: 'محاولات كثيرة جداً. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.',
  },
};

const bookingMessages: Record<string, LocalizedMessage> = {
  'visit-time-must-be-future': {
    en: 'Please choose a future visit time.',
    ar: 'يرجى اختيار وقت زيارة قادم.',
  },
  'standard-route-required': {
    en: 'Please choose a recommended route for the standard tour.',
    ar: 'يرجى اختيار مسار مقترح للجولة القياسية.',
  },
  'personalized-exhibit-required': {
    en: 'Please choose at least one exhibit for your personalized tour.',
    ar: 'يرجى اختيار معروض واحد على الأقل لجولتك المخصصة.',
  },
  'unsupported-tour-language': {
    en: 'Choose a supported tour language.',
    ar: 'اختر لغة جولة مدعومة.',
  },
  'custom-tour-language-required': {
    en: 'Please type your preferred language.',
    ar: 'يرجى كتابة اللغة التي تفضلها.',
  },
  'standard-route-duration-mismatch': {
    en: 'This route needs a longer tour duration.',
    ar: 'يحتاج هذا المسار إلى مدة جولة أطول.',
  },
};

function localized(message: LocalizedMessage, isArabic: boolean) {
  return isArabic ? message.ar : message.en;
}

function errorCode(error: unknown) {
  if (typeof error === 'string') return '';
  return String((error as { code?: unknown })?.code ?? '').trim();
}

function errorMessage(error: unknown) {
  if (typeof error === 'string') return error.trim();
  return String((error as { message?: unknown })?.message ?? '').trim();
}

export function authErrorMessage(error: unknown, isArabic = false): string {
  const message = errorMessage(error);
  if (isConnectionError(error) || message.toLowerCase().includes('connection')) {
    return productMessage('network', isArabic);
  }
  const mapped = authMessages[errorCode(error)];
  if (mapped) return localized(mapped, isArabic);
  return isArabic
    ? 'حدث خطأ ما. يرجى التحقق من الاتصال والمحاولة مرة أخرى.'
    : 'Something went wrong. Please check your connection and try again.';
}

export function bookingErrorMessage(error: unknown, isArabic = false): string {
  const message = errorMessage(error);
  if (isConnectionError(error) || message.toLowerCase().includes('connection')) {
    return productMessage('network', isArabic);
  }
  if (message.startsWith('visitor-count-must-be-')) {
    return isArabic ? 'يرجى اختيار تذكرة زائر واحدة على الأقل.' : 'Please choose at least one visitor ticket.';
  }
  if (message.startsWith('too-many-exhibits-for-duration-')) {
    const max = message.replace('too-many-exhibits-for-duration-', '');
    return isArabic
      ? `تدعم هذه المدة حتى ${max} معروضات. اختر مدة أطول لإضافة المزيد.`
      : `This duration supports up to ${max} exhibits. Choose a longer duration to add more.`;
  }
  const mapped = bookingMessages[message];
  if (mapped) return localized(mapped, isArabic);
  return isArabic
    ? 'تعذر إتمام الحجز. يرجى مراجعة التفاصيل والمحاولة مرة أخرى.'
    : 'We could not complete your booking. Please check your details and try again.';
}

export function contactValidationMessage(field: string | undefined, isArabic = false): string {
  if (field === 'name') return isArabic ? 'يرجى إدخال اسمك.' : 'Please enter your name.';
  if (field === 'email') return isArabic ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
  if (field === 'message') return isArabic ? 'يرجى كتابة رسالتك.' : 'Please enter your message.';
  if (field === 'subject') return isArabic ? 'يرجى اختيار موضوع الرسالة.' : 'Please choose a message subject.';
  return isArabic ? 'يرجى مراجعة النموذج قبل الإرسال.' : 'Please review the form before sending.';
}

export function contactSendErrorMessage(isArabic = false): string {
  return isArabic ? 'تعذر إرسال رسالتك. يرجى المحاولة مرة أخرى.' : 'Your message could not be sent. Please try again.';
}
