import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  Hash,
  Zap,
} from 'lucide-react';

export const metadata = {
  title: 'Just the Point — CIE Daily',
  description: 'India’s small AI labs, explained in 20 seconds.',
};

export default function BriefPage() {
  const points = [
    'Teams are designing for the way Indians actually mix languages in conversation.',
    'Smaller models can run cheaply enough for clinics, schools and neighbourhood shops.',
    'The winner may be the most relevant model—not the one with the most parameters.',
  ];
  return (
    <main className="quick-page">
      <header>
        <a href="/">
          <img src="/cie-mascot.png" alt="CIE Daily" />
        </a>
        <a href="/">
          <ArrowLeft /> Back to today
        </a>
      </header>
      <article>
        <p className="quick-category">
          <Zap /> JUST THE POINT{' '}
          <span>
            <Clock3 /> ~20 SEC
          </span>
        </p>
        <h1>
          India’s small AI labs are building the models Big Tech overlooked
        </h1>
        <section className="quick-summary">
          <span>IN 20 SECONDS</span>
          <h2>India’s AI edge may be local context—not sheer model size.</h2>
          <p>
            Small labs are training cheaper systems around Indian languages,
            accents and public-service needs. They can beat global models on
            narrow local tasks, but better training data is still the big
            constraint.
          </p>
        </section>
        <section className="three-things">
          <span>3 THINGS TO KNOW</span>
          {points.map((point, index) => (
            <div key={point}>
              <i>{index + 1}</i>
              <p>{point}</p>
              <Check />
            </div>
          ))}
        </section>
        <section className="quick-number">
          <Hash />
          <div>
            <strong>22</strong>
            <span>official languages to build for</span>
          </div>
          <p>and hundreds more dialects in everyday use.</p>
        </section>
        <a className="read-full" href="/story">
          <span>Still curious?</span>
          <b>Read the full story</b>
          <ArrowUpRight />
        </a>
        <footer>
          <span>YOU NOW KNOW ✓</span>
          <a href="/">Next brief →</a>
        </footer>
      </article>
    </main>
  );
}
