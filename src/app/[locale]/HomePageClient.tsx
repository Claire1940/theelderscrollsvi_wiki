"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  ChevronDown,
  Clapperboard,
  Clock,
  Compass,
  Cpu,
  ExternalLink,
  Flag,
  GitBranch,
  Map as MapIcon,
  MessageCircle,
  Milestone,
  MonitorSmartphone,
  ScrollText,
  Sparkles,
  Swords,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

// Eyebrow badge shared by every module header — keeps the section look unified.
function ModuleEyebrow({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-5"
    >
      <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
      <span className="text-xs md:text-sm font-medium tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

// Unified module header: eyebrow + title + subtitle/intro.
function ModuleHeader({
  icon,
  eyebrow,
  title,
  subtitle,
  intro,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  subtitle?: string;
  intro?: string;
}) {
  return (
    <div className="text-center mb-8 md:mb-12 scroll-reveal">
      <ModuleEyebrow icon={icon} label={eyebrow} />
      <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      {intro && (
        <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto mt-3 md:mt-4">
          {intro}
        </p>
      )}
    </div>
  );
}

// Helper: badge tone by classification/category keyword.
function badgeTone(text: string): string {
  const t = text.toLowerCase();
  if (
    t.includes("confirmed") ||
    t.includes("official") ||
    t.includes("series tradition") ||
    t.includes("series foundation")
  ) {
    return "bg-[hsl(var(--nav-theme)/0.18)] border-[hsl(var(--nav-theme)/0.45)] text-[hsl(var(--nav-theme-light))]";
  }
  if (
    t.includes("rumor") ||
    t.includes("unsupported") ||
    t.includes("speculation") ||
    t.includes("setting theory")
  ) {
    return "bg-white/5 border-border text-muted-foreground";
  }
  return "bg-[hsl(var(--nav-theme)/0.08)] border-[hsl(var(--nav-theme)/0.3)] text-foreground/80";
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.theelderscrollsvi.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "The Elder Scrolls VI Wiki",
        description:
          "The Elder Scrolls VI Wiki tracks verified release updates, platforms, setting clues, Creation Engine 3 details, trailers, lore, and Bethesda development news.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "The Elder Scrolls VI - Upcoming Open-World Fantasy RPG",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "The Elder Scrolls VI Wiki",
        alternateName: "The Elder Scrolls VI",
        url: siteUrl,
        description:
          "The Elder Scrolls VI Wiki resource hub for release updates, platforms, setting clues, trailers, technology, and Bethesda development news",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "The Elder Scrolls VI Wiki - Upcoming Open-World Fantasy RPG",
        },
        sameAs: [
          "https://www.elderscrolls.com/",
          "https://discord.gg/bethesda",
          "https://www.reddit.com/r/TESVI/",
          "https://www.youtube.com/@bethesda",
        ],
      },
      {
        "@type": "VideoGame",
        name: "The Elder Scrolls VI",
        gamePlatform: ["Xbox", "PC"],
        applicationCategory: "Game",
        genre: ["RPG", "Open World", "Fantasy", "Action"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
          url: "https://www.elderscrolls.com/",
        },
      },
      {
        "@type": "VideoObject",
        name: "The Elder Scrolls VI – Official Announcement Teaser",
        description:
          "Official The Elder Scrolls VI announcement teaser from Bethesda Game Studios, revealed at E3 2018.",
        uploadDate: "2018-06-11",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/OkFdqqyI8y4",
        url: "https://www.youtube.com/watch?v=OkFdqqyI8y4",
      },
    ],
  };

  // Accordion state for Story and Lore module
  const [loreExpanded, setLoreExpanded] = useState<number | null>(0);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Tools Grid 锚点映射（与下方 8 个 section id 一一对应）
  const sectionIds = [
    "release-date",
    "platforms",
    "trailer",
    "setting-and-map",
    "gameplay",
    "development-timeline",
    "creation-engine-3",
    "story-and-lore",
  ];

  const m = t.modules;
  const releaseDate = m.elderScrollsViReleaseDate;
  const platforms = m.elderScrollsViPlatforms;
  const trailer = m.elderScrollsViTrailer;
  const setting = m.elderScrollsViSettingAndMap;
  const gameplay = m.elderScrollsViGameplay;
  const devTimeline = m.elderScrollsViDevelopmentTimeline;
  const engine = m.elderScrollsViCreationEngine3;
  const lore = m.elderScrollsViStoryAndLore;

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href="https://www.elderscrolls.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://www.youtube.com/watch?v=OkFdqqyI8y4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero（前半屏：Hero → 视频区 → 模块导航区） */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="OkFdqqyI8y4"
              title="The Elder Scrolls VI – Official Announcement Teaser"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（模块导航区，紧跟视频区） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = sectionIds[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Release Date (timeline) */}
      <section id="release-date" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={CalendarClock}
            eyebrow={releaseDate.eyebrow}
            title={releaseDate.title}
            subtitle={releaseDate.subtitle}
            intro={releaseDate.intro}
          />

          <div className="scroll-reveal space-y-4 md:space-y-5">
            {releaseDate.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 md:gap-6 p-5 md:p-6
                           bg-white/5 border border-border rounded-xl
                           hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:w-44 md:flex-shrink-0">
                  <div
                    className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full
                               border-2 border-[hsl(var(--nav-theme)/0.5)]
                               bg-[hsl(var(--nav-theme)/0.15)] flex-shrink-0"
                  >
                    <CalendarClock className="w-5 h-5 md:w-6 md:h-6 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm md:text-base font-bold text-[hsl(var(--nav-theme-light))] whitespace-nowrap">
                      {item.date}
                    </div>
                    <div
                      className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full border ${badgeTone(item.type)}`}
                    >
                      {item.type}
                    </div>
                  </div>
                </div>
                <div className="flex-1 md:border-l md:border-border md:pl-6">
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 4 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Platforms (table) */}
      <section
        id="platforms"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MonitorSmartphone}
            eyebrow={platforms.eyebrow}
            title={platforms.title}
            subtitle={platforms.subtitle}
            intro={platforms.intro}
          />

          {/* 桌面端表格 */}
          <div className="scroll-reveal hidden md:block overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.12)]">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">
                    {platforms.columns.platform}
                  </th>
                  <th className="px-4 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">
                    {platforms.columns.status}
                  </th>
                  <th className="px-4 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">
                    {platforms.columns.availability}
                  </th>
                  <th className="px-4 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">
                    {platforms.columns.details}
                  </th>
                </tr>
              </thead>
              <tbody>
                {platforms.items.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t border-border align-top hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-4 font-semibold whitespace-nowrap">
                      {item.platform}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-full border ${badgeTone(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">
                      {item.availability}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {item.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 移动端卡片 */}
          <div className="scroll-reveal md:hidden space-y-3">
            {platforms.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-4 bg-white/5 border border-border rounded-xl"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold">{item.platform}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${badgeTone(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-[hsl(var(--nav-theme-light))] mb-2">
                  {item.availability}
                </p>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Trailer (video-gallery) */}
      <section id="trailer" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Clapperboard}
            eyebrow={trailer.eyebrow}
            title={trailer.title}
            subtitle={trailer.subtitle}
            intro={trailer.intro}
          />

          {/* Featured video card */}
          <div className="scroll-reveal mb-6 md:mb-8 p-5 md:p-6 bg-[hsl(var(--nav-theme)/0.06)] border border-[hsl(var(--nav-theme)/0.35)] rounded-xl flex flex-col sm:flex-row items-start gap-4">
            <div
              className="h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-lg
                         bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.4)]
                         flex items-center justify-center"
            >
              <Youtube className="w-7 h-7 md:w-8 md:h-8 text-[hsl(var(--nav-theme-light))]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold mb-1">
                {trailer.featuredVideo.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {trailer.featuredVideo.date} · {trailer.featuredVideo.event}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${trailer.featuredVideo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white text-sm font-semibold transition-colors"
              >
                <Youtube className="w-4 h-4" />
                {trailer.featuredVideo.watchLabel}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Video entries grid */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {trailer.items.map((item: any, index: number) => (
              <div
                key={index}
                className={`p-5 border rounded-xl transition-colors ${
                  item.available
                    ? "bg-white/5 border-border hover:border-[hsl(var(--nav-theme)/0.5)]"
                    : "bg-white/[0.02] border-dashed border-border/70"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border ${badgeTone(item.videoType)}`}
                  >
                    <Clapperboard className="w-3 h-3" />
                    {item.videoType}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${item.available ? "bg-[hsl(var(--nav-theme)/0.18)] border-[hsl(var(--nav-theme)/0.45)] text-[hsl(var(--nav-theme-light))]" : "bg-white/5 border-border text-muted-foreground"}`}
                  >
                    {item.available ? "Available" : "Upcoming"}
                  </span>
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {item.date} · {item.event}
                </p>
                <ul className="space-y-1.5">
                  {item.details.map((d: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 4: Setting and Map (map-cards) */}
      <section
        id="setting-and-map"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MapIcon}
            eyebrow={setting.eyebrow}
            title={setting.title}
            subtitle={setting.subtitle}
            intro={setting.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {setting.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-white/5 border border-border rounded-xl
                           hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${badgeTone(item.category)}`}
                  >
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">{item.region}</h3>
                <p className="text-xs text-[hsl(var(--nav-theme-light))] mb-3">
                  {item.mapScope}
                </p>
                <ul className="space-y-1.5 mb-3 flex-1">
                  {item.evidence.map((e: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{e}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic text-foreground/80 border-t border-border pt-3">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 5: Gameplay (card-list) */}
      <section id="gameplay" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Swords}
            eyebrow={gameplay.eyebrow}
            title={gameplay.title}
            subtitle={gameplay.subtitle}
            intro={gameplay.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gameplay.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-white/5 border border-border rounded-xl
                           hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors flex flex-col"
              >
                <div
                  className="mb-3 h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.12)]
                             flex items-center justify-center"
                >
                  <DynamicIcon
                    name={item.icon}
                    className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                  />
                </div>
                <span
                  className={`self-start text-xs px-2 py-0.5 rounded-full border mb-2 ${badgeTone(item.classification)}`}
                >
                  {item.classification}
                </span>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  {item.category}
                </p>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 6: Development Timeline (vertical-timeline) */}
      <section
        id="development-timeline"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={GitBranch}
            eyebrow={devTimeline.eyebrow}
            title={devTimeline.title}
            subtitle={devTimeline.subtitle}
            intro={devTimeline.intro}
          />

          <div className="scroll-reveal relative pl-8 md:pl-10 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 md:space-y-8">
            {devTimeline.items.map((item: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[2.1rem] md:-left-[2.6rem] w-5 h-5 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-background" />
                </div>
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Milestone className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${badgeTone(item.phase)}`}
                    >
                      {item.phase}
                    </span>
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Creation Engine 3 (comparison-table) */}
      <section id="creation-engine-3" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Cpu}
            eyebrow={engine.eyebrow}
            title={engine.title}
            subtitle={engine.subtitle}
            intro={engine.intro}
          />

          {/* 桌面端表格 */}
          <div className="scroll-reveal hidden md:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.12)]">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-[hsl(var(--nav-theme-light))] w-44">
                    {engine.columns.technologyArea}
                  </th>
                  <th className="px-4 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">
                    {engine.columns.earlierGames}
                  </th>
                  <th className="px-4 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">
                    {engine.columns.starfieldBaseline}
                  </th>
                  <th className="px-4 py-3 font-semibold text-[hsl(var(--nav-theme-light))]">
                    {engine.columns.tesViDirection}
                  </th>
                </tr>
              </thead>
              <tbody>
                {engine.items.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t border-border align-top hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-4 font-semibold whitespace-nowrap">
                      <span className="inline-flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                        {item.technologyArea}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {item.earlierGames}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {item.starfieldBaseline}
                    </td>
                    <td className="px-4 py-4 text-foreground/90">
                      {item.tesViDirection}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 移动端卡片 */}
          <div className="scroll-reveal md:hidden space-y-4">
            {engine.items.map((item: any, index: number) => (
              <div
                key={index}
                className="p-4 bg-white/5 border border-border rounded-xl"
              >
                <h3 className="font-bold mb-3 inline-flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  {item.technologyArea}
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-[hsl(var(--nav-theme-light))] mb-0.5">
                      {engine.columns.earlierGames}
                    </p>
                    <p className="text-muted-foreground">{item.earlierGames}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[hsl(var(--nav-theme-light))] mb-0.5">
                      {engine.columns.starfieldBaseline}
                    </p>
                    <p className="text-muted-foreground">{item.starfieldBaseline}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[hsl(var(--nav-theme-light))] mb-0.5">
                      {engine.columns.tesViDirection}
                    </p>
                    <p>{item.tesViDirection}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Story and Lore (accordion) */}
      <section
        id="story-and-lore"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={ScrollText}
            eyebrow={lore.eyebrow}
            title={lore.title}
            subtitle={lore.subtitle}
            intro={lore.intro}
          />

          <div className="scroll-reveal max-w-3xl mx-auto space-y-3">
            {lore.items.map((item: any, index: number) => {
              const isOpen = loreExpanded === index;
              return (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden bg-white/5"
                >
                  <button
                    onClick={() => setLoreExpanded(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${badgeTone(item.classification)}`}
                      >
                        {item.classification}
                      </span>
                      <span className="font-semibold text-sm md:text-base truncate">
                        {item.section}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-[hsl(var(--nav-theme-light))]" : "text-muted-foreground"}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 md:px-5 pb-5">
                      <p className="text-sm md:text-base text-foreground/90 mb-3">
                        {item.summary}
                      </p>
                      <ul className="space-y-2">
                        {item.details.map((d: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <Flag className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section（移至 8 个模块之后，前半屏顺序不受影响） */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.gg/bethesda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/ElderScrolls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/TESVI/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@bethesda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={locale === "en" ? "/about" : `/${locale}/about`}
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "en" ? "/privacy-policy" : `/${locale}/privacy-policy`}
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "en" ? "/terms-of-service" : `/${locale}/terms-of-service`}
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "en" ? "/copyright" : `/${locale}/copyright`}
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
