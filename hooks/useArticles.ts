'use client';

import { useEffect, useState } from 'react';
import {
  subscribeToArticle,
  subscribeToArticles,
  type Article,
} from '@/lib/articles';

type LoadState<T> = { data: T; loading: boolean; error: Error | null };

export function useArticles(): LoadState<Article[]> {
  const [state, setState] = useState<LoadState<Article[]>>({
    data: [],
    loading: true,
    error: null,
  });
  useEffect(
    () =>
      subscribeToArticles({
        next: (data) => setState({ data, loading: false, error: null }),
        error: (error) => {
          console.error(
            '[CIE Daily] Firestore article subscription failed',
            error,
          );
          setState((current) => ({ ...current, loading: false, error }));
        },
      }),
    [],
  );
  return state;
}

export function useArticle(id: string): LoadState<Article | null> {
  const [state, setState] = useState<LoadState<Article | null>>({
    data: null,
    loading: true,
    error: null,
  });
  useEffect(
    () =>
      subscribeToArticle(id, {
        next: (data) => setState({ data, loading: false, error: null }),
        error: (error) => {
          console.error(`[CIE Daily] Firestore article ${id} failed`, error);
          setState((current) => ({ ...current, loading: false, error }));
        },
      }),
    [id],
  );
  return state;
}
