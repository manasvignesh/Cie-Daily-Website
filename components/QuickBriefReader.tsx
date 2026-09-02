'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  Hash,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { useArticle } from '@/hooks/useArticles';
import { SiteHeader } from './SiteHeader';

export function QuickBriefReader({ id }: { id: string }) {
  const { data: article, loading, error } = useArticle(id);
  if (loading)
    return (
      <main>
        <SiteHeader />
        <div className="reader-loading">
          <div />
          <i />
          <i />
          <section />
        </div>
      </main>
    );
  if (error)
    return (
      <main>
        <SiteHeader />
        <section className="feed-state error">
          <span>BRIEF UNAVAILABLE</span>
          <h1>We couldn’t load this brief.</h1>
          <button onClick={() => location.reload()}>
            <RotateCcw /> Try again
          </button>
        </section>
      </main>
    );
  if (!article)
    return (
      <main>
        <SiteHeader />
        <section className="feed-state">
          <span>BRIEF NOT FOUND</span>
          <h1>Nothing to brief—yet.</h1>
          <Link href="/">Return to Latest</Link>
        </section>
      </main>
    );
  const points = article.threeThings.length
    ? article.threeThings
    : [article.whatHappened || article.quickSummary].filter(Boolean);
  return (
    <main className="quick-page">
      <SiteHeader activePath="/briefs" />
      <article>
        <Link className="back-link" href="/">
          <ArrowLeft /> Back to Latest
        </Link>
        <p className="quick-category">
          <Zap /> JUST THE POINT{' '}
          <span>
            <Clock3 /> ~20 SEC
          </span>
        </p>
        <h1>{article.headline}</h1>
        <section className="quick-summary">
          <span>IN 20 SECONDS</span>
          <h2>{article.quickSummary || article.hook}</h2>
        </section>
        <section className="three-things">
          <span>{points.length} THINGS TO KNOW</span>
          {points.map((point, index) => (
            <div key={point}>
              <i>{index + 1}</i>
              <p>{point}</p>
              <Check />
            </div>
          ))}
        </section>
        {article.keyNumber && (
          <section className="quick-number">
            <Hash />
            <div>
              <strong>{article.keyNumber.value}</strong>
              <span>{article.keyNumber.label}</span>
            </div>
          </section>
        )}
        <Link className="read-full" href={`/story/${article.id}`}>
          <span>Still curious?</span>
          <b>Read the full story</b>
          <ArrowUpRight />
        </Link>
        <footer>
          <span>YOU NOW KNOW ✓</span>
          <Link href="/briefs">Next brief →</Link>
        </footer>
      </article>
    </main>
  );
}
