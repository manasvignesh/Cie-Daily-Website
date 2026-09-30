import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Breakpoint — Editorial Policy & Attribution Standards',
  description:
    'Editorial guidelines, sourcing standards, correction procedures, and curation principles for the Breakpoint mobile application.',
  robots: {
    index: true,
    follow: true,
  },
};

const supportEmail = 'vigneshmanas24@gmail.com';
const developerName = 'Manas Vignesh Varma';

const policySections = [
  {
    title: '1. Mission & Scope',
    content: [
      'Breakpoint is designed to help students, developers, and curious readers discover and understand critical developments in technology, business, science, and the broader world.',
      'Our primary editorial purpose is educational and informational synthesis: taking comprehensive, complex news and formatting it into digestible briefs, key numbers, takeaways, and full context.',
    ],
  },
  {
    title: '2. Sourcing & Attribution Standards',
    content: [
      'Original Publisher Integrity: Whenever Breakpoint curates or summarizes third-party reporting, the original publisher (e.g. Business Standard, Reuters, TechCrunch, The Verge, ISRO) is prominently identified at both the top of the summary and in the dedicated Source section.',
      'Direct Source Links: A direct, actionable link to the original reporting is displayed whenever a valid source URL exists in the article record.',
      'Author Attribution: Where author names are available from the original publisher, they are preserved and credited alongside the publisher identity.',
      'Breakpoint does not intentionally publish misleading or unsupported attribution. News records without usable publisher or publication-date metadata are withheld until corrected.',
    ],
  },
  {
    title: '3. Editorial Desk & Summarization Role',
    content: [
      'The "Breakpoint Editorial Desk" serves as an editorial formatting and synthesis team. It formats stories into distinct sections (e.g. "In 20 Seconds", "Key Numbers", "Why This Matters", "Explore the Story", "You Now Know") for optimal mobile readability.',
      'Breakpoint Editorial Desk is NEVER represented as the original reporting entity or publisher of third-party news. External news remains strictly attributed to its primary source.',
    ],
  },
  {
    title: '4. AI & Automated Editorial Tools',
    content: [
      'Automated and AI-assisted tools may assist our editorial pipeline in summarizing lengthy articles, extracting key numerical metrics, generating multiple-choice comprehension questions, and translating content for accessibility.',
      'AI-assisted processing does not remove or replace the original publisher attribution or stored source link. Readers and publishers can report any inaccurate summary or attribution for review and correction.',
    ],
  },
  {
    title: '5. Corrections & Provenance Requests',
    content: [
      `If an author, publisher, or reader notices an inaccuracy in our summaries or believes source attribution requires updating, please contact ${supportEmail} with the subject line "Breakpoint Correction".`,
      'Correction requests are reviewed promptly. When adjustments are made, updated timestamps are reflected on the story.',
    ],
  },
  {
    title: '6. Original Content',
    content: [
      'Original articles, interactive puzzles, and educational deep-dives created by Breakpoint contributors and staff are explicitly designated with "Breakpoint" as the original publisher.',
    ],
  },
];

export default function BreakpointEditorialPolicyPage() {
  return (
    <main className="policy-page editorial-page">
      <header className="policy-header">
        <Link
          href="/breakpoint/contact"
          className="policy-brand"
          aria-label="Breakpoint contact home"
        >
          Breakpoint
        </Link>
        <nav className="policy-nav" aria-label="Breakpoint policies">
          <Link
            href="/breakpoint/contact"
            className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Contact & Editorial Info
          </Link>
          <Link
            href="/breakpoint/privacy-policy"
            className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="border-b-2 border-[var(--orange)] pb-1 text-xs font-black tracking-[0.12em] uppercase"
          >
            CIE Daily
          </Link>
        </nav>
      </header>

      <article className="policy-article">
        <Link
          href="/breakpoint/contact"
          className="policy-back"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Contact & Info
        </Link>
        <h1 className="policy-title">
          Breakpoint — Editorial Policy
        </h1>
        <p className="policy-lede">
          Our standards for curation, summarization, original source attribution, and factual integrity.
        </p>
        <p className="policy-note">
          This policy applies to all curated stories, briefs, and published articles within the Breakpoint mobile application (operated by {developerName}).
        </p>

        <div className="policy-sections">
          {policySections.map((section) => (
            <section
              key={section.title}
              className="policy-section"
            >
              <h2 className="mb-4 font-[var(--serif)] text-2xl font-bold text-[var(--ink)]">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {section.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── CORRECTIONS CONTACT CTA ── */}
        <section className="policy-card correction-card">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-[var(--orange)]" />
            <div>
              <h2 className="text-lg font-bold text-[var(--ink)]">Have a Correction or Question?</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                We take provenance and accuracy seriously. Reach out to our team at{' '}
                <a href={`mailto:${supportEmail}`} className="font-bold text-[var(--orange)] underline">
                  {supportEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </article>

      <footer className="policy-footer">
        <div className="mx-auto max-w-5xl px-5 space-y-2">
          <p>© 2026 Breakpoint · Operated by {developerName}</p>
          <nav aria-label="Breakpoint policy links">
            <Link href="/breakpoint/contact" className="hover:text-[var(--ink)]">Contact Us</Link>
            <span>·</span>
            <Link href="/breakpoint/privacy-policy" className="hover:text-[var(--ink)]">Privacy Policy</Link>
            <span>·</span>
            <Link href="/breakpoint/editorial-policy" className="hover:text-[var(--ink)]">Editorial Policy</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
