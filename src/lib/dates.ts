import type { Language } from '@/i18n';

/**
 * Long date like "Wednesday, 18 November" / "الأربعاء، 18 نوفمبر".
 * Arabic uses Western digits by default (spec: medical values and dates stay 0-9).
 */
export function formatLongDate(date: Date, language: Language): string {
  const locale = language === 'ar' ? 'ar-OM-u-nu-latn' : 'en-GB';
  try {
    return new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
  } catch {
    return date.toDateString();
  }
}
