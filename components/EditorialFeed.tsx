'use client';
/* eslint-disable next/no-img-element */

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  RotateCcw,
  X,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { categorySlug, type Article } from '@/lib/articles';
import { useArticles } from '@/hooks/useArticles';
import { SiteHeader, Wordmark } from './SiteHeader';

const topicCopy: Record<string, string> = {
  latest: 'The stories moving technology, business and India right now.',
  briefs: 'The day’s essential stories, distilled for a faster read.',
  stories: 'Full-context reporting for when the headline is not enough.',
  spaces: 'Conversations and live rooms from the CIE Daily community.',
};

function StoryChoice({
  article,
  close,
}: {
  article: Article;
  close: () => void;
}) {
  return (
    <div className="choice-backdrop">
      <button
        className="choice-dismiss"
        onClick={close}
        aria-label="Close story options"
      />
      <dialog
        open
        className="choice-sheet"
        aria-modal="true"
        aria-labelledby="choice-title"
      >
        <button className="close-choice" onClick={close} aria-label="Close">
          <X />
        </button>
        <span className="choice-kicker">YOU’VE GOT OPTIONS</span>
        <h2 id="choice-title">How do you want this story?</h2>
        <p className="choice-story">{article.headline}</p>
        <div className="choice-panels">
          <Link href={`/brief/${article.id}`}>
            <Zap />
            <span>
              <b>JUST THE POINT</b>
              <small>Quick Summary · ~20 sec</small>
            </span>
            <ArrowUpRight />
          </Link>
          <Link href={`/story/${article.id}`}>
            <ArrowUpRight />
            <span>
              <b>TAKE ME DEEPER</b>
              <small>Full Article · Full context</small>
            </span>
            <ArrowUpRight />
          </Link>
        </div>
        <small className="choice-note">
          No wrong answers. Just different attention spans.
        </small>
      </dialog>
    </div>
  );
}

function FeedSkeleton() {
  return (
    <div className="editorial-shell skeleton" aria-label="Loading stories">
      <div className="skeleton-kicker" />
      <div className="skeleton-title" />
      <div className="skeleton-lead">
        <div />
        <section>
          <i />
          <i />
          <i />
        </section>
      </div>
      {[1, 2, 3].map((item) => (
        <div className="skeleton-row" key={item}>
          <div />
          <section>
            <i />
            <i />
          </section>
        </div>
      ))}
    </div>
  );
}

function ArticleRow({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: (article: Article) => void;
}) {
  return (
    <article className="stream-row">
      <button
        className="story-trigger"
        onClick={() => onOpen(article)}
        aria-label={`Open ${article.headline}`}
      >
        <div className="story-image">
          {article.imageUrl ? (
            <img src={article.imageUrl} alt="" loading="lazy" />
          ) : (
            <span>CIE</span>
          )}
        </div>
        <div className="story-row-copy">
          <p>
            {article.category} <i>·</i> {article.dateLabel}
          </p>
          <h3>{article.headline}</h3>
          {article.hook && <span>{article.hook}</span>}
          <small>{article.readTime} min read</small>
        </div>
        <ArrowUpRight />
      </button>
    </article>
  );
}

export function EditorialFeed({ topic = 'latest' }: { topic?: string }) {
  const { data: articles, loading, error } = useArticles();
  const [choice, setChoice] = useState<Article | null>(null);
  const selected = topic === 'home' ? 'latest' : topic;
  const filtered = useMemo(
    () =>
      ['latest', 'briefs', 'stories'].includes(selected)
        ? articles
        : articles.filter(
            (article) => categorySlug(article.category) === selected,
          ),
    [articles, selected],
  );
  const lead = filtered.find((article) => article.isFeatured) || filtered[0];
  const supporting = filtered
    .filter((article) => article.id !== lead?.id)
    .slice(0, 2);
  const stream = filtered.filter(
    (article) =>
      article.id !== lead?.id &&
      !supporting.some((item) => item.id === article.id),
  );
  const label =
    selected === 'latest'
      ? 'Latest'
      : articles.find((article) => categorySlug(article.category) === selected)
          ?.category ||
        selected
          .replaceAll('-', ' ')
          .replace(/\b\w/g, (letter) => letter.toUpperCase());
  const groups = useMemo(
    () =>
      selected === 'latest'
        ? Array.from(new Set(articles.map((article) => article.category)))
            .map((category) => ({
              category,
              articles: articles
                .filter((article) => article.category === category)
                .slice(0, 3),
            }))
            .filter((group) => group.articles.length > 1)
            .slice(0, 4)
        : [],
    [articles, selected],
  );

  return (
    <main id="top">
      <SiteHeader activePath={selected === 'latest' ? '/' : `/${selected}`} />
      {loading ? (
        <FeedSkeleton />
      ) : (
        <>
          {error ? (
            <section className="feed-state error">
              <span>CONNECTION INTERRUPTED</span>
              <h1>The newsroom feed missed a beat.</h1>
              <p>Your stories are still safe. Try reconnecting to Firestore.</p>
              <button onClick={() => location.reload()}>
                <RotateCcw /> Try again
              </button>
            </section>
          ) : filtered.length === 0 ? (
            <section className="feed-state">
              <img
                src="/cie-mascot.png"
                alt="CIE Daily mascot peeking from behind a page"
              />
              <span>
                {articles.length
                  ? 'NOTHING FILED HERE YET'
                  : 'THE NEWSROOM IS QUIET'}
              </span>
              <h1>
                {articles.length
                  ? `No ${label} stories—yet.`
                  : 'Fresh stories are on the way.'}
              </h1>
              <p>
                {articles.length
                  ? 'Switch topics or check back when the next story lands.'
                  : 'The moment an editor publishes, it will appear here automatically.'}
              </p>
              <Link href="/">
                Return to Latest <ArrowRight />
              </Link>
            </section>
          ) : (
            <div className="editorial-shell content-enter">
              <header className="feed-intro">
                <p>{selected === 'latest' ? 'TODAY AT CIE DAILY' : 'TOPIC'}</p>
                <h1>{label}</h1>
                <span>
                  {topicCopy[selected] ||
                    `Reporting and ideas from the world of ${label.toLowerCase()}.`}
                </span>
              </header>
              {lead && (
                <section className="editorial-lead">
                  <button
                    className="lead-trigger"
                    onClick={() => setChoice(lead)}
                  >
                    <div className="lead-photo">
                      {lead.imageUrl ? (
                        <img src={lead.imageUrl} alt="" fetchPriority="high" />
                      ) : (
                        <span>CIE DAILY</span>
                      )}
                      <em>if you read one thing ↘</em>
                    </div>
                    <div className="lead-copy">
                      <p>
                        {lead.category} <i>·</i> {lead.dateLabel}
                      </p>
                      <h2>{lead.headline}</h2>
                      <span>{lead.hook || lead.quickSummary}</span>
                      <footer>
                        <b>{lead.authorName}</b>
                        <small>{lead.readTime} min read</small>
                        <Bookmark />
                      </footer>
                    </div>
                  </button>
                </section>
              )}
              {supporting.length > 0 && (
                <section
                  className="supporting-grid"
                  aria-label="More top stories"
                >
                  {supporting.map((article) => (
                    <article key={article.id}>
                      <button onClick={() => setChoice(article)}>
                        <div>
                          {article.imageUrl ? (
                            <img src={article.imageUrl} alt="" loading="lazy" />
                          ) : (
                            <span>CIE</span>
                          )}
                        </div>
                        <p>
                          {article.category} · {article.dateLabel}
                        </p>
                        <h3>{article.headline}</h3>
                        {article.hook && <span>{article.hook}</span>}
                        <small>
                          {article.readTime} min read <ArrowUpRight />
                        </small>
                      </button>
                    </article>
                  ))}
                </section>
              )}
              <section className="stream">
                <header>
                  <p>
                    {selected === 'briefs' ? 'QUICK BRIEFS' : 'LATEST STORIES'}
                  </p>
                  <span>
                    {filtered.length} published{' '}
                    {filtered.length === 1 ? 'story' : 'stories'}
                  </span>
                </header>
                {stream.length ? (
                  stream.map((article) => (
                    <ArticleRow
                      key={article.id}
                      article={article}
                      onOpen={setChoice}
                    />
                  ))
                ) : (
                  <p className="stream-end">You’re all caught up.</p>
                )}
              </section>
              {groups.length > 0 && (
                <section className="topic-sections">
                  {groups.map((group) => (
                    <section key={group.category}>
                      <header>
                        <h2>{group.category}</h2>
                        <Link href={`/${categorySlug(group.category)}`}>
                          More in {group.category} <ArrowRight />
                        </Link>
                      </header>
                      <div>
                        {group.articles.map((article) => (
                          <button
                            key={article.id}
                            onClick={() => setChoice(article)}
                          >
                            {article.imageUrl ? (
                              <img
                                src={article.imageUrl}
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <span className="image-fallback">CIE</span>
                            )}
                            <small>{article.dateLabel}</small>
                            <h3>{article.headline}</h3>
                          </button>
                        ))}
                      </div>
                    </section>
                  ))}
                </section>
              )}
            </div>
          )}
        </>
      )}
      {choice && <StoryChoice article={choice} close={() => setChoice(null)} />}
      <footer className="site-footer">
        <div>
          <Wordmark />
          <p>Understand more. Scroll less.</p>
        </div>
        <p>Every published story. One live newsroom.</p>
        <span>© 2026 CIE Daily · Made with curiosity in India.</span>
      </footer>
    </main>
  );
}
