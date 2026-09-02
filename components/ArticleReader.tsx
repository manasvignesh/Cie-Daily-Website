'use client';
/* eslint-disable next/no-img-element */

import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  Check,
  MessageCircle,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { useArticle } from '@/hooks/useArticles';
import { SiteHeader } from './SiteHeader';

function ReaderLoading() {
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
}

export function ArticleReader({ id }: { id: string }) {
  const { data: article, loading, error } = useArticle(id);
  if (loading) return <ReaderLoading />;
  if (error)
    return (
      <main>
        <SiteHeader />
        <section className="feed-state error">
          <span>STORY UNAVAILABLE</span>
          <h1>We couldn’t load this story.</h1>
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
          <span>STORY NOT FOUND</span>
          <h1>This page went out for chai.</h1>
          <Link href="/">Return to Latest</Link>
        </section>
      </main>
    );
  const paragraphs = [
    article.whatHappened,
    ...article.blocks.map((block) => block.content || ''),
  ].filter(Boolean);
  return (
    <main className="article-page">
      <SiteHeader />
      <article>
        <header className="article-hero">
          <Link href="/" className="back-link">
            <ArrowLeft /> Back to Latest
          </Link>
          <p className="article-category">
            {article.category} <span>· {article.dateLabel}</span>
          </p>
          <h1>{article.headline}</h1>
          {article.hook && <p className="article-hook">{article.hook}</p>}
          <div className="article-meta">
            {article.authorAvatar ? (
              <img src={article.authorAvatar} alt="" />
            ) : (
              <span>{article.authorName.slice(0, 2).toUpperCase()}</span>
            )}
            <p>
              <b>{article.authorName}</b>
              <small>
                {article.dateLabel} · {article.readTime} min read
              </small>
            </p>
          </div>
        </header>
        {article.imageUrl && (
          <figure className="article-image">
            <img src={article.imageUrl} alt="" fetchPriority="high" />
            <figcaption>{article.headline}</figcaption>
          </figure>
        )}
        <div className="article-grid">
          <aside className="article-rail">
            <span>IN THIS STORY</span>
            <a href="#summary">In 20 Seconds</a>
            <a href="#context">Why this matters</a>
            <a href="#details">Explore the story</a>
            <a href="#picture">Bigger picture</a>
          </aside>
          <div className="article-body">
            {article.quickSummary && (
              <section className="twenty-seconds" id="summary">
                <p>
                  IN 20 SECONDS <i>okay, here’s the point</i>
                </p>
                <h2>{article.quickSummary}</h2>
                {article.threeThings.length > 0 && (
                  <ul>
                    {article.threeThings.map((point) => (
                      <li key={point}>
                        <Check />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
            {article.numbers.length > 0 && (
              <section className="key-numbers">
                <p>KEY NUMBERS</p>
                <div>
                  {article.numbers.map((number) => (
                    <article key={`${number.value}-${number.label}`}>
                      <strong>{number.value}</strong>
                      <span>{number.label}</span>
                    </article>
                  ))}
                </div>
              </section>
            )}
            <section className="prose" id="details">
              <h2>EXPLORE THE STORY</h2>
              {paragraphs.length ? (
                paragraphs.map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))
              ) : (
                <p>{article.quickSummary}</p>
              )}
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.content
                    .split(/\n+/)
                    .filter(Boolean)
                    .map((line, index) => (
                      <p key={index}>{line.replace(/^[•-]\s*/, '')}</p>
                    ))}
                </section>
              ))}
            </section>
            {article.whyThisMatters && (
              <section className="prose offset-heading" id="context">
                <h2>WHY THIS MATTERS</h2>
                <p>{article.whyThisMatters}</p>
              </section>
            )}
            {article.quote && (
              <blockquote>
                “{article.quote.text}”<cite>— {article.quote.author}</cite>
              </blockquote>
            )}
            {article.biggerPicture && (
              <section className="prose bigger-picture" id="picture">
                <h2>BIGGER PICTURE</h2>
                <p>{article.biggerPicture}</p>
              </section>
            )}
            {article.takeaways.length > 0 && (
              <section className="you-know">
                <span>YOU NOW KNOW</span>
                <h2>{article.takeaways[0]}</h2>
                {article.takeaways.slice(1).map((takeaway) => (
                  <p key={takeaway}>{takeaway}</p>
                ))}
              </section>
            )}
            <div className="article-actions">
              <button>
                <Bookmark /> Save
              </button>
              <button>
                <MessageCircle /> Discuss
              </button>
              <button>
                <Share2 /> Share
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
