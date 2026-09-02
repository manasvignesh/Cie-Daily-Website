import Link from 'next/link';
/* eslint-disable next/no-img-element */

export default function NotFound() {
  return <main className="feed-state"><img src="/cie-mascot.png" alt="The CIE Daily mascot looks confused"/><span>404 · WRONG TURN</span><h1>This page went out for chai.</h1><p>We checked under the fold. It’s definitely not here.</p><Link href="/">Take me back to today →</Link></main>;
}
