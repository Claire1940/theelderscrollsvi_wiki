import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theelderscrollsvi.wiki'
  const path = '/about'

  return {
    title: 'About The Elder Scrolls VI Wiki - Verified Release & News Hub',
    description: 'Learn about The Elder Scrolls VI Wiki, a community-driven resource hub providing verified release updates, platform news, setting analysis, trailers, and technology details for Bethesda Game Studios upcoming fantasy RPG.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'The Elder Scrolls VI Wiki',
      title: 'About The Elder Scrolls VI Wiki',
      description: 'Learn about our mission to provide the best verified The Elder Scrolls VI release, setting, and news coverage.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'The Elder Scrolls VI Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About The Elder Scrolls VI Wiki',
      description: 'Learn about our mission to provide the best verified The Elder Scrolls VI news and analysis.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About The Elder Scrolls VI Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your verified resource center for Bethesda&apos;s next mainline fantasy RPG
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to The Elder Scrolls VI Wiki</h2>
            <p>
              The Elder Scrolls VI Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping fans
              follow Bethesda Game Studios&apos; next mainline fantasy RPG. We are a community-driven platform that tracks verified release updates,
              platform news, setting clues, trailers, technology details, and development milestones in one place.
            </p>
            <p>
              Whether you are a long-time Elder Scrolls fan awaiting the next chapter or a newcomer trying to separate confirmed
              facts from rumors, The Elder Scrolls VI Wiki is here to help you stay informed every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower The Elder Scrolls VI fans with accurate, clearly sourced information</strong>
              that separates official announcements from reported rumors and community speculation. We strive to:
            </p>
            <ul>
              <li><strong>Verify before publishing:</strong> Mark every update as Confirmed, Reported, or Speculation so you always know how much weight to give it</li>
              <li><strong>Track official channels:</strong> Monitor Bethesda Game Studios statements, interviews, and trailers for new information</li>
              <li><strong>Build a clear timeline:</strong> Maintain an organized development history from the 2018 reveal to launch</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for fans around the world</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision The Elder Scrolls VI Wiki as the <strong>go-to destination</strong> for every fan seeking reliable
              pre-release coverage. We want to be the resource that players trust and rely on, whether they need release date
              updates, platform details, setting theories, or a breakdown of the latest trailer.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release Updates</h3>
              <p className="text-slate-300">
                A verified timeline of development milestones, official statements, and release date news
                as Bethesda shares them.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎮</div>
              <h3 className="text-xl font-semibold text-white mb-2">Platforms &amp; Availability</h3>
              <p className="text-slate-300">
                Clear coverage of confirmed and unconfirmed platforms, including Xbox, PC, Game Pass,
                and the ongoing PS5 discussion.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🗺️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Setting &amp; Regions</h3>
              <p className="text-slate-300">
                Trailer-based analysis of possible locations such as Hammerfell and High Rock, clearly
                labeled as theories rather than confirmed facts.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Trailers &amp; Media</h3>
              <p className="text-slate-300">
                The official announcement teaser, screenshots, logos, and frame-by-frame breakdowns
                with sourced context.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="text-xl font-semibold text-white mb-2">Technology &amp; Engine</h3>
              <p className="text-slate-300">
                Coverage of Creation Engine 3, expected mod support, graphics technology, and
                performance targets based on official remarks.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages, including English, German, Spanish, and French,
                to serve fans across key Elder Scrolls regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              The Elder Scrolls VI Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and corrections from fans everywhere. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Official sources:</strong> Bethesda Game Studios statements, interviews, and press coverage</li>
              <li><strong>Community analysis:</strong> Trailer breakdowns, lore comparisons, and well-reasoned theories</li>
              <li><strong>Reader feedback:</strong> Your corrections and tips help us keep information accurate</li>
              <li><strong>Source labeling:</strong> Every claim is tagged Confirmed, Reported, or Speculation</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you spotted an outdated detail, found a new official statement,
              or have a well-sourced theory to share, we&apos;d love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              The Elder Scrolls VI Wiki is maintained by a dedicated team of passionate Elder Scrolls fans and writers who care
              about the series as much as you do. We are players first, constantly following official channels, analyzing trailers,
              and separating verified news from rumors.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Source verification:</strong> Tagging every claim by confidence level (Confirmed / Reported / Speculation)</li>
              <li><strong>Elder Scrolls lore:</strong> Deep understanding of Tamriel, regions, races, and series history</li>
              <li><strong>Web development:</strong> Building fast, user-friendly pages and tools</li>
              <li><strong>Content creation:</strong> Writing clear, neutral, and well-sourced coverage</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Focus: Tracking Bethesda&apos;s next journey across Tamriel.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>The Elder Scrolls VI Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with Bethesda Game Studios, Microsoft, Xbox, or any official entities.
            </p>
            <p>
              The Elder Scrolls VI has not yet been released. Some content on this site reflects official announcements,
              while other content is based on reported rumors, trailer analysis, or community speculation, and is clearly labeled as such.
              All game content, trademarks, characters, and assets are the property of their respective owners.
            </p>
            <p>
              The Elder Scrolls VI Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We&apos;d love to hear from you! Whether you have questions, suggestions, found an error, or just want to share a theory:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@theelderscrollsvi.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@theelderscrollsvi.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">News Tips &amp; Corrections</h3>
                <a href="mailto:support@theelderscrollsvi.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@theelderscrollsvi.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@theelderscrollsvi.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@theelderscrollsvi.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@theelderscrollsvi.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@theelderscrollsvi.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest release news, trailers, and verified The Elder Scrolls VI developments.
            Bookmark this site and check back regularly for new information!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
