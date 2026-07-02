import { Locale } from '@/lib/types';
import { privacyPolicy } from './privacy-policy';
import { termsOfService } from './terms-of-service';
import { LegalDocument } from './types';

export function getPrivacyPolicy(locale: Locale): LegalDocument {
  return privacyPolicy[locale] || privacyPolicy.en;
}

export function getTermsOfService(locale: Locale): LegalDocument {
  return termsOfService[locale] || termsOfService.en;
}

export { privacyPolicy, termsOfService };
export type { LegalDocument, LegalSection } from './types';
