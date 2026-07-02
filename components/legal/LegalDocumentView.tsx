import { LegalDocument } from '@/lib/legal/types';
import { Locale } from '@/lib/types';
import { t } from '@/lib/translations';
import Link from 'next/link';

interface LegalDocumentViewProps {
  document: LegalDocument;
  locale: Locale;
}

export function LegalDocumentView({ document, locale }: LegalDocumentViewProps) {
  const visibleSections = document.sections.filter((section) => section.title);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <section className="bg-gradient-to-br from-gold-50 to-cream-100 py-12 lg:py-16 border-b border-cream-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
              {document.title}
            </h1>
            <p className="text-sm text-charcoal-600">
              {t('legal.lastUpdated', locale)}: {document.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-charcoal-700 leading-relaxed mb-10 pb-8 border-b border-cream-200">
              {document.intro}
            </p>

            {visibleSections.length > 1 && (
              <nav className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-cream-200">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-800 mb-4">
                  {t('legal.tableOfContents', locale)}
                </h2>
                <ol className="space-y-2 text-sm">
                  {visibleSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-charcoal-700 hover:text-gold-700 transition-colors"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="space-y-10">
              {document.sections.map((section) => (
                <article key={section.id} id={section.id} className="scroll-mt-24">
                  {section.title && (
                    <h2 className="text-xl lg:text-2xl font-bold text-charcoal-900 mb-4">
                      {section.title}
                    </h2>
                  )}
                  <div className="space-y-4 text-charcoal-700 leading-relaxed">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    {section.listItems && section.listItems.length > 0 && (
                      <ul className="list-disc pl-6 space-y-2">
                        {section.listItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-cream-200 text-sm text-charcoal-600">
              <p>{t('legal.questions', locale)}</p>
              <Link
                href={`/${locale}/contact`}
                className="text-gold-700 hover:text-gold-800 font-medium underline mt-2 inline-block"
              >
                {t('nav.contact', locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
