import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getContactAddress, getContactMapsUrl } from '@/lib/site';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { ArrowRight, BookOpen, HandHeart, MapPin, Music2, Sparkles, Users } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: t('nav.about', locale),
    description: t('about.hero.subtitle', locale),
    openGraph: {
      title: t('nav.about', locale),
      description: t('about.hero.subtitle', locale),
    },
  };
}

const JOURNEY_STEPS = [
  { title: 'about.journey.step1.title', body: 'about.journey.step1.body' },
  { title: 'about.journey.step2.title', body: 'about.journey.step2.body' },
  { title: 'about.journey.step3.title', body: 'about.journey.step3.body' },
  { title: 'about.journey.step4.title', body: 'about.journey.step4.body' },
] as const;

const VALUES = [
  {
    title: 'about.values.authenticity.title',
    body: 'about.values.authenticity.body',
    icon: Sparkles,
  },
  {
    title: 'about.values.care.title',
    body: 'about.values.care.body',
    icon: HandHeart,
  },
  {
    title: 'about.values.presence.title',
    body: 'about.values.presence.body',
    icon: Users,
  },
] as const;

const OFFERS = [
  {
    title: 'about.offer.bowls.title',
    body: 'about.offer.bowls.body',
    icon: Music2,
    href: (locale: Locale) => `/${locale}/shop`,
  },
  {
    title: 'about.offer.sessions.title',
    body: 'about.offer.sessions.body',
    icon: Users,
    href: (locale: Locale) => `/${locale}/gallery/albums`,
  },
  {
    title: 'about.offer.knowledge.title',
    body: 'about.offer.knowledge.body',
    icon: BookOpen,
    href: (locale: Locale) => `/${locale}/blog`,
  },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const address = getContactAddress();
  const mapsUrl = getContactMapsUrl();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gold-50 via-cream-50 to-bronze-50 py-16 lg:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-bronze-200/30 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 border-gold-200 bg-gold-100 text-gold-800"
            >
              {t('about.hero.badge', locale)}
            </Badge>

            <h1 className="mb-6 font-serif text-4xl font-bold text-charcoal-900 lg:text-5xl">
              {t('about.hero.title', locale)}
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-charcoal-700">
              {t('about.hero.subtitle', locale)}
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={`/${locale}/shop`}>
                <Button className="btn-primary px-8 py-3 text-base">
                  {t('about.hero.ctaShop', locale)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button variant="outline" className="border-2 border-gold-300 px-8 py-3 text-base hover:bg-gold-50">
                  {t('about.hero.ctaContact', locale)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center font-serif text-3xl font-bold text-charcoal-900 lg:text-4xl">
              {t('about.mission.title', locale)}
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-charcoal-700">
              <p>{t('about.mission.p1', locale)}</p>
              <p>{t('about.mission.p2', locale)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-gold-100/80 bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-charcoal-900 lg:text-4xl">
              {t('about.journey.title', locale)}
            </h2>
            <p className="text-lg text-charcoal-600">
              {t('about.journey.subtitle', locale)}
            </p>
          </div>

          <ol className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {JOURNEY_STEPS.map((step, index) => (
              <li key={step.title}>
                <Card className="h-full border-0 shadow-md">
                  <CardContent className="flex h-full gap-4 p-7">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100 font-serif text-lg font-bold text-gold-800">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-charcoal-900">
                        {t(step.title, locale)}
                      </h3>
                      <p className="leading-relaxed text-charcoal-600">
                        {t(step.body, locale)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-charcoal-900 lg:text-4xl">
              {t('about.values.title', locale)}
            </h2>
            <p className="text-lg text-charcoal-600">
              {t('about.values.subtitle', locale)}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-100">
                      <Icon className="h-7 w-7 text-gold-700" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-charcoal-900">
                      {t(value.title, locale)}
                    </h3>
                    <p className="leading-relaxed text-charcoal-600">
                      {t(value.body, locale)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-bronze-900 py-16 text-white lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold lg:text-4xl">
              {t('about.offer.title', locale)}
            </h2>
            <p className="text-lg text-cream-200/90">
              {t('about.offer.subtitle', locale)}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {OFFERS.map((offer) => {
              const Icon = offer.icon;
              return (
                <Link
                  key={offer.title}
                  href={offer.href(locale)}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-gold-400/40 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/20">
                    <Icon className="h-6 w-6 text-gold-300" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold group-hover:text-gold-300">
                    {t(offer.title, locale)}
                  </h3>
                  <p className="mb-4 leading-relaxed text-cream-100/80">
                    {t(offer.body, locale)}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-gold-300">
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Place */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gold-100 bg-white p-8 shadow-md sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-100">
                <MapPin className="h-7 w-7 text-gold-700" />
              </div>
              <div>
                <h2 className="mb-3 font-serif text-2xl font-bold text-charcoal-900 sm:text-3xl">
                  {t('about.place.title', locale)}
                </h2>
                <p className="mb-4 text-lg leading-relaxed text-charcoal-700">
                  {t('about.place.body', locale)}
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gold-700 underline-offset-4 hover:text-gold-800 hover:underline"
                >
                  {address}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-gold-100 to-bronze-50 px-8 py-12 text-center shadow-sm">
            <h2 className="mb-3 font-serif text-3xl font-bold text-charcoal-900">
              {t('about.cta.title', locale)}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-charcoal-700">
              {t('about.cta.body', locale)}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={`/${locale}/shop`}>
                <Button className="btn-primary px-7 py-3">
                  {t('about.hero.ctaShop', locale)}
                </Button>
              </Link>
              <Link href={`/${locale}/gallery`}>
                <Button variant="outline" className="border-2 border-gold-400 px-7 py-3 hover:bg-white">
                  {t('about.cta.gallery', locale)}
                </Button>
              </Link>
              <Link href={`/${locale}/blog`}>
                <Button variant="ghost" className="px-7 py-3 text-gold-800 hover:bg-gold-50">
                  {t('about.cta.blog', locale)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
