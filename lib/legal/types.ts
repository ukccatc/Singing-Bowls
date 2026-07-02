import { Locale } from '@/lib/types';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export type LocalizedLegalDocument = Record<Locale, LegalDocument>;
