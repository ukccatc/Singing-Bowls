/** Cookie / analytics consent stored in localStorage (GDPR-friendly opt-in). */

export const CONSENT_STORAGE_KEY = 'hs-cookie-consent';

export type ConsentChoice = 'accepted' | 'rejected';

export function readConsentChoice(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === 'accepted' || value === 'rejected') return value;
  } catch {
    // ignore
  }
  return null;
}

export function writeConsentChoice(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // ignore
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsentChoice() === 'accepted';
}
