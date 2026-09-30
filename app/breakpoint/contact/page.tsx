import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Globe, Shield, BookOpen, AlertCircle, User, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Breakpoint — Contact Us',
  description:
    'Official contact information, editorial transparency standards, and developer details for the Breakpoint mobile application published by Manas Vignesh Varma.',
  robots: {
    index: true,
    follow: true,
  },
};

const supportEmail = 'vigneshmanas24@gmail.com';
const developerName = 'Manas Vignesh Varma';
const websiteUrl = 'https://cie-daily-website.vercel.app';
const canonicalUrl = 'https://cie-daily-website.vercel.app/breakpoint/contact';

export default function BreakpointContactPage() {
  return (
    <main className="policy-page contact-page">
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
            href="/breakpoint/privacy-policy"
            className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/breakpoint/editorial-policy"
            className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Editorial Policy
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
        <p className="policy-kicker">
          Breakpoint mobile application
        </p>
        <h1 className="policy-title">
          Breakpoint — About & Contact
        </h1>
        <p className="policy-lede">
          Breakpoint is a news and knowledge platform that helps readers understand important developments through concise briefs, full stories, contextual explanations, and source-linked reporting.
        </p>
        <p className="policy-note">
          This is the canonical contact and editorial transparency page for the <strong>Breakpoint</strong> mobile application on Google Play (Package: <code>com.ciedaily.app</code>). This page is public, permanent, and accessible without login.
        </p>

        {/* ── OPERATOR & DEVELOPER CARD ── */}
        <section className="policy-card">
          <h2 className="mb-6 flex items-center gap-2 font-[var(--serif)] text-2xl font-bold">
            <User className="h-6 w-6 text-[var(--orange)]" />
            Developer & Operator
          </h2>
          <div className="contact-grid">
            <div className="contact-fact">
              <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Operated & Developed By</span>
              <p className="mt-1 text-lg font-bold text-[var(--ink)]">{developerName}</p>
              <p className="text-xs text-[var(--muted)]">Google Play Registered Publisher</p>
            </div>
            <div className="contact-fact">
              <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Application Name</span>
              <p className="mt-1 text-lg font-bold text-[var(--ink)]">Breakpoint</p>
              <p className="text-xs text-[var(--muted)]">Android Application · ID: com.ciedaily.app</p>
            </div>
            <div className="contact-fact">
              <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Editorial Desk</span>
              <p className="mt-1 text-lg font-bold text-[var(--ink)]">Breakpoint Editorial Desk</p>
              <p className="text-xs text-[var(--muted)]">Curation, formatting & summary team</p>
            </div>
            <div className="contact-fact">
              <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Canonical Contact URL</span>
              <p className="mt-1 text-sm font-semibold text-[var(--orange)] break-all">{canonicalUrl}</p>
            </div>
          </div>
        </section>

        {/* ── CONTACT METHODS ── */}
        <section className="policy-card">
          <h2 className="mb-6 flex items-center gap-2 font-[var(--serif)] text-2xl font-bold">
            <Mail className="h-6 w-6 text-[var(--orange)]" />
            Direct Contact Information
          </h2>
          <p className="mb-6 text-sm text-[var(--muted)] leading-relaxed">
            For support inquiries, editorial feedback, copyright questions, or corrections regarding any summarized article, contact us directly:
          </p>
          <div className="contact-methods">
            <a
              href={`mailto:${supportEmail}`}
              className="contact-link"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--orange)]/10 text-[var(--orange)]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--muted)] uppercase">General Support & Editorial Email</p>
                  <p className="text-base font-bold text-[var(--ink)]">{supportEmail}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[var(--orange)] uppercase">Send Email →</span>
            </a>

            <a
              href={`mailto:${supportEmail}?subject=Breakpoint%20Article%20Correction%20%2F%20Feedback`}
              className="contact-link"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--orange)]/10 text-[var(--orange)]">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--muted)] uppercase">Corrections & Source Attribution Concerns</p>
                  <p className="text-base font-bold text-[var(--ink)]">{supportEmail}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[var(--orange)] uppercase">Report Issue →</span>
            </a>

            <a
              href={websiteUrl}
              className="contact-link"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--orange)]/10 text-[var(--orange)]">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--muted)] uppercase">Official Website</p>
                  <p className="text-sm font-semibold text-[var(--ink)] break-all">{websiteUrl}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[var(--orange)] uppercase">Visit Website →</span>
            </a>
          </div>
        </section>

        {/* ── EDITORIAL TRANSPARENCY SECTION ── */}
        <section className="policy-card">
          <h2 className="mb-4 flex items-center gap-2 font-[var(--serif)] text-2xl font-bold">
            <BookOpen className="h-6 w-6 text-[var(--orange)]" />
            Editorial Transparency & Source Attribution
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            <p>
              Breakpoint brings together editorial stories from multiple publishers and clearly identifies the original source of third-party reporting. Breakpoint may summarize and format stories to make them easier to understand while preserving source attribution.
            </p>
            <div className="source-points">
              <div className="source-point">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--orange)]" />
                <p className="text-sm">
                  <strong>Original Source Preservation:</strong> Published third-party stories must identify their original publisher. A direct source link is displayed whenever a valid link exists in the article record.
                </p>
              </div>
              <div className="source-point">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--orange)]" />
                <p className="text-sm">
                  <strong>Role of Breakpoint Editorial Desk:</strong> Breakpoint Editorial Desk acts solely as an editor, synthesizer, and formatter for readability. We never substitute Breakpoint as the original author of third-party reporting.
                </p>
              </div>
              <div className="source-point">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--orange)]" />
                <p className="text-sm">
                  <strong>Publication Freshness:</strong> Stories require a publication or creation date and are ordered newest first. Records missing the publisher or date are withheld from readers until corrected.
                </p>
              </div>
              <div className="source-point">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--orange)]" />
                <p className="text-sm">
                  <strong>Corrections Policy:</strong> If you believe any summary misrepresents the original reporting or if source metadata needs adjustment, email us for prompt correction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── POLICIES & LINKS ── */}
        <section className="policy-card">
          <h2 className="mb-4 flex items-center gap-2 font-[var(--serif)] text-2xl font-bold">
            <Shield className="h-6 w-6 text-[var(--orange)]" />
            Policies & Declarations
          </h2>
          <div className="policy-links">
            <Link
              href="/breakpoint/privacy-policy"
              className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 transition-all hover:border-[var(--orange)]"
            >
              <p className="font-bold text-[var(--ink)]">Privacy Policy →</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Data protection, permissions, and account deletion procedures.</p>
            </Link>
            <Link
              href="/breakpoint/editorial-policy"
              className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 transition-all hover:border-[var(--orange)]"
            >
              <p className="font-bold text-[var(--ink)]">Editorial Policy →</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Our standards for curation, summarization, and provenance.</p>
            </Link>
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
