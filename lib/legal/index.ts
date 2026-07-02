import { Locale } from '@/lib/types';
import { faqDocument, getFaq } from './faq';
import { privacyPolicy } from './privacy-policy';
import { returnPolicy } from './return-policy';
import { shippingPolicy } from './shipping-policy';
import { termsOfService } from './terms-of-service';
import { LegalDocument } from './types';

export function getPrivacyPolicy(locale: Locale): LegalDocument {
  return privacyPolicy[locale] || privacyPolicy.en;
}

export function getTermsOfService(locale: Locale): LegalDocument {
  return termsOfService[locale] || termsOfService.en;
}

export function getShippingPolicy(locale: Locale): LegalDocument {
  return shippingPolicy[locale] || shippingPolicy.en;
}

export function getReturnPolicy(locale: Locale): LegalDocument {
  return returnPolicy[locale] || returnPolicy.en;
}

export { faqDocument, getFaq, privacyPolicy, returnPolicy, shippingPolicy, termsOfService };
export type { FaqCategory, FaqDocument, FaqItem } from './faq';
export type { LegalDocument, LegalSection } from './types';
