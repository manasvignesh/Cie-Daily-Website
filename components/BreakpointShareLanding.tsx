'use client';

import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.ciedaily.app';
type Kind = 'connect' | 'list';

export function BreakpointShareLanding({ kind, value }: { kind: Kind; value: string }) {
  const [list, setList] = useState<{ title: string; ownerName: string; count: number } | null>(null);

  useEffect(() => {
    if (kind !== 'list') return;
    getDoc(doc(db, 'articleLists', value)).then((snapshot) => {
      const data = snapshot.data();
      if (!snapshot.exists() || !data || data.isPublic === false) return;
      setList({
        title: String(data.title || 'Breakpoint List'),
        ownerName: String(data.ownerName || 'A Breakpoint reader'),
        count: Array.isArray(data.articleIds) ? data.articleIds.length : 0,
      });
    }).catch(() => undefined);
  }, [kind, value]);

  const sameUrl = `/${kind}/${encodeURIComponent(value)}`;
  return (
    <main className="share-landing">
      <p className="share-landing-mark">BREAKPOINT</p>
      <p className="share-landing-kicker">BY MANAS</p>
      <h1>{kind === 'connect' ? 'Open Breakpoint to connect.' : list?.title || 'A Breakpoint List'}</h1>
      <p className="share-landing-meta">
        {kind === 'connect' ? 'Open Breakpoint to connect.' : list ? `${list.ownerName} · ${list.count} ${list.count === 1 ? 'story' : 'stories'}` : 'Shared on Breakpoint.'}
      </p>
      <div className="share-landing-actions">
        <a href={sameUrl} className="share-landing-primary">Open Breakpoint</a>
        <a href={PLAY_URL} className="share-landing-secondary">Get Breakpoint</a>
      </div>
    </main>
  );
}
