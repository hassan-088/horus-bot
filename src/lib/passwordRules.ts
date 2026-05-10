// Strict password rules used by signup forms across the website.
// All rules must pass before Firebase signup is attempted.

export interface PasswordRule {
  id: 'length' | 'upper' | 'lower' | 'number' | 'special';
  test: (pw: string) => boolean;
  labelEn: string;
  labelAr: string;
  errorEn: string;
  errorAr: string;
}

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: 'length',
    test: (p) => p.length >= 8,
    labelEn: 'Minimum 8 characters',
    labelAr: '٨ أحرف على الأقل',
    errorEn: 'Password must be at least 8 characters.',
    errorAr: 'يجب أن تكون كلمة المرور ٨ أحرف على الأقل.',
  },
  {
    id: 'upper',
    test: (p) => /[A-Z]/.test(p),
    labelEn: 'Uppercase letter',
    labelAr: 'حرف كبير',
    errorEn: 'Password must include one uppercase letter.',
    errorAr: 'يجب أن تتضمن حرفاً كبيراً.',
  },
  {
    id: 'lower',
    test: (p) => /[a-z]/.test(p),
    labelEn: 'Lowercase letter',
    labelAr: 'حرف صغير',
    errorEn: 'Password must include one lowercase letter.',
    errorAr: 'يجب أن تتضمن حرفاً صغيراً.',
  },
  {
    id: 'number',
    test: (p) => /\d/.test(p),
    labelEn: 'Number',
    labelAr: 'رقم',
    errorEn: 'Password must include one number.',
    errorAr: 'يجب أن تتضمن رقماً.',
  },
  {
    id: 'special',
    test: (p) => /[^A-Za-z0-9]/.test(p),
    labelEn: 'Special character',
    labelAr: 'رمز خاص',
    errorEn: 'Password must include one special character.',
    errorAr: 'يجب أن تتضمن رمزاً خاصاً.',
  },
];

export function firstPasswordError(pw: string, isArabic = false): string | null {
  for (const r of PASSWORD_RULES) {
    if (!r.test(pw)) return isArabic ? r.errorAr : r.errorEn;
  }
  return null;
}

export function isStrongPassword(pw: string): boolean {
  return PASSWORD_RULES.every((r) => r.test(pw));
}

// Loose phone validator (international or local — digits, spaces, +, -, parens, 7-20 chars).
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()+]/g, '');
  return /^\d{7,15}$/.test(cleaned);
}
