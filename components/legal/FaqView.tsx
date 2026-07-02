import { FaqDocument } from '@/lib/legal/faq';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import Link from 'next/link';

interface FaqViewProps {
  document: FaqDocument;
  locale: Locale;
}

export function FaqView({ document, locale }: FaqViewProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: document.categories.flatMap((category) =>
      category.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer.join(' '),
        },
      })),
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

            {document.categories.length > 1 && (
              <nav className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-cream-200">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-800 mb-4">
                  {t('legal.tableOfContents', locale)}
                </h2>
                <ol className="space-y-2 text-sm">
                  {document.categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`#${category.id}`}
                        className="text-charcoal-700 hover:text-gold-700 transition-colors"
                      >
                        {category.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="space-y-12">
              {document.categories.map((category) => (
                <section key={category.id} id={category.id} className="scroll-mt-24">
                  <h2 className="text-xl lg:text-2xl font-bold text-charcoal-900 mb-6">
                    {category.title}
                  </h2>
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <details
                        key={index}
                        className="group bg-white rounded-xl border border-cream-200 shadow-sm overflow-hidden"
                      >
                        <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-semibold text-charcoal-900 hover:bg-cream-50 transition-colors">
                          <span>{item.question}</span>
                          <span
                            aria-hidden="true"
                            className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 text-gold-800 flex items-center justify-center text-lg leading-none transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <div className="px-5 pb-5 pt-0 text-charcoal-700 leading-relaxed space-y-3 border-t border-cream-200">
                          {item.answer.map((paragraph, pIndex) => (
                            <p key={pIndex} className="pt-3 first:pt-4">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-cream-200 text-sm text-charcoal-600">
              <p>{t('faq.stillHaveQuestions', locale)}</p>
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
