import type { Metadata } from 'next';
import Link from 'next/link';

import { Wordmark } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Breakpoint Privacy Policy',
  description:
    'Privacy Policy for the Breakpoint mobile application published on Google Play by Manas Vignesh Varma.',
  robots: {
    index: true,
    follow: true,
  },
};

const effectiveDate = 'September 9, 2026';
const privacyEmail = 'vigneshmanas24@gmail.com';

const sections = [
  ['1. Introduction', [
    'This Privacy Policy explains how Breakpoint collects, uses, stores, and protects information when you use the Breakpoint Android mobile application.',
    'Breakpoint is a mobile application developed and published on Google Play by Manas Vignesh Varma.',
    'The CIE Daily website hosts this Privacy Policy for Breakpoint. CIE Daily Studio is a separate admin/studio application and is not the developer name for the Breakpoint Google Play listing.',
  ]],
  ['2. Information We Collect', [
    'Breakpoint collects information needed to provide authentication, profiles, posts, comments, social connections, chat, notifications, live audio spaces, media upload, app security, and diagnostics.',
    'This may include account identifiers, email address, display name, profile information, profile photo URL, department, year of study, connection code, blocked users, follower and following data, posts, article or reel content, uploaded media URLs, likes, bookmarks, comments, direct messages, group chat messages, live-space chat messages, notification preferences, device push tokens, technical logs, crash diagnostics, and network request metadata such as IP address processed by service providers.',
  ]],
  ['3. Account Information', [
    'Breakpoint supports email/password authentication and Google Sign-In through Firebase Authentication. When you sign in, Firebase may provide Breakpoint with your user ID, email address, display name, and Google profile photo if available.',
    'When you complete your profile, Breakpoint stores your name, email address, department, year of study, connection code, and related profile settings in Cloud Firestore.',
  ]],
  ['4. Information Users Provide', [
    'Users may provide profile details, posts, article text, reel/video posts, comments, connection requests, direct messages, group chat messages, live-space messages, and media selected from their device.',
    'Creator and admin features may publish content to the Breakpoint feed. Some profile details and published content may be visible to other Breakpoint users according to the app feature being used.',
  ]],
  ['5. Device and Technical Information', [
    'Breakpoint uses Firebase, Firebase App Check, Firebase Cloud Messaging, Sentry, connectivity checks, local storage, and standard network requests. These services may process app version, device platform, installation identifiers, crash and error details, performance traces, push tokens, timestamps, and IP/network information needed to operate and secure the app.',
    'Breakpoint stores some local app data using Hive and shared preferences to support app behavior and preferences. Firestore remains the source of truth for account and social data.',
  ]],
  ['6. Permissions and Why They Are Required', [
    'Internet access is required to sign in, load content, use chat, upload media, receive live updates, connect to backend services, and join LiveKit rooms.',
    'Camera and photo/video access are used when you choose to capture or select media for posts or your profile. Microphone and audio settings access are used for live audio spaces. Bluetooth access may support audio devices during live audio sessions. Notification permission is used to send chat and content updates. Older Android storage permissions support media selection on older devices.',
    'Breakpoint does not request location or contacts permissions in the Android manifest reviewed for this policy.',
  ]],
  ['7. User Generated Content', [
    'Breakpoint includes user-generated content such as posts, reels, article content, comments, profile information, connection data, and chat messages. Content you publish or share may be visible to other users depending on the feature and your role.',
    'Uploaded images and videos are sent to Cloudinary and the returned media URLs are stored with the related post or profile record.',
  ]],
  ['8. Messages and Communication', [
    'Breakpoint supports direct conversations, connection requests, group chats, and live-space messages. Messages and related metadata such as sender ID, conversation ID, timestamps, participant details, unread counts, and routing identifiers are stored in Firebase/Firestore and may be processed through trusted backend functions.',
    'Chat notification payloads may include sender names and message text so the recipient can receive useful message alerts.',
  ]],
  ['9. Live Audio and Video Functionality', [
    'Breakpoint uses LiveKit and WebRTC technology for live spaces. The app requests microphone access for users who are allowed to publish audio and uses LiveKit room tokens tied to your Firebase user ID, display name or email prefix, role, and room information.',
    'Live rooms may process audio in real time through LiveKit infrastructure. Breakpoint does not request location or contacts for live rooms.',
  ]],
  ['10. Notifications', [
    'Breakpoint uses Firebase Cloud Messaging to deliver notifications about chats, creator content, and app updates. If you grant notification permission, the app stores your FCM token under your user account in Firestore with platform and timestamp metadata.',
    'On logout, Breakpoint attempts to remove the stored token and delete the local messaging token so private notifications are not sent to a signed-out user on that device.',
  ]],
  ['11. Analytics and Diagnostics', [
    'The reviewed code does not show an advertising SDK or a dedicated Firebase Analytics dependency. Breakpoint uses Sentry for error reporting and diagnostics. Sentry is configured not to send default personally identifiable information, but diagnostic events may still include technical information needed to debug errors.',
    'Firebase and other service providers may process operational logs and security information as part of providing authentication, messaging, database, storage, and app-check services.',
  ]],
  ['12. AI Processing', [
    'The reviewed production app code does not show OpenAI, Gemini, or similar AI API SDK calls. Breakpoint includes text-to-speech narration functionality for reading article content aloud on device or through platform TTS support.',
  ]],
  ['13. How Information Is Used', [
    'Information is used to create and authenticate accounts, show profiles, operate social connections, display feeds and posts, enable comments and messages, upload and serve media, operate live spaces, send notifications, enforce roles and moderation, protect the service, debug errors, and maintain app reliability.',
  ]],
  ['14. Third-Party Services', [
    'Breakpoint uses Firebase Authentication, Cloud Firestore, Firebase Cloud Messaging, Firebase App Check, Google Sign-In, Supabase Edge Functions used as trusted backend endpoints, Cloudinary for image and video uploads, LiveKit/WebRTC for live rooms, Sentry for diagnostics, and Google Play services involved in Android distribution and platform behavior.',
    'These providers process information according to their own terms and privacy practices while helping Breakpoint provide the app features described in this policy.',
  ]],
  ['15. Data Sharing', [
    'Breakpoint does not sell personal information. Information is shared only as needed to operate the app, for example with backend and infrastructure providers, with other users when you publish content or communicate in app features, or when required by law or to protect rights, safety, and security.',
  ]],
  ['16. Data Storage', [
    'Account, profile, feed, social, chat, notification, and live-space records are stored primarily in Firebase/Firestore. Media files selected for upload are sent to Cloudinary. Backend functions may process authenticated requests through Firebase and Supabase-hosted endpoints.',
    'Some data may be cached locally on your device for app operation and preferences.',
  ]],
  ['17. Data Security', [
    'Breakpoint uses Firebase Authentication, Firestore security rules, Firebase App Check, HTTPS endpoints, role checks, and provider security controls to help protect data. No system can guarantee perfect security, but the app is designed to limit access based on authentication and feature permissions.',
  ]],
  ['18. Data Retention', [
    'Breakpoint keeps account, profile, content, social, message, notification, and media records for as long as needed to provide the app, comply with legal obligations, resolve disputes, enforce rules, and maintain safety and reliability.',
    'Some cleanup is immediate or best effort, such as push token removal on logout. Published content, conversations, and uploaded media may remain until deleted through app functionality, moderation, backend retention processes, or a valid deletion request.',
  ]],
  ['19. Account and Data Deletion', [
    `To request account or data deletion, contact ${privacyEmail} from the email address associated with your Breakpoint account and include that the request is for the Breakpoint app.`,
    'Breakpoint may need to retain limited records when required for security, fraud prevention, legal compliance, dispute resolution, or to preserve records associated with other users, such as messages already delivered to conversation participants.',
  ]],
  ["20. Children's Privacy", [
    'Breakpoint is not intended for children under 13. If you believe a child has provided personal information through Breakpoint, contact the privacy email below so the issue can be reviewed.',
  ]],
  ['21. User Rights', [
    'Depending on where you live, you may have rights to access, correct, delete, or restrict certain personal information. You can make a privacy request by contacting the privacy email below.',
  ]],
  ['22. Changes to This Privacy Policy', [
    'This policy may be updated when Breakpoint changes its features, service providers, legal requirements, or data practices. The effective date at the top of this page will be updated when changes are made.',
  ]],
  ['23. Contact and Privacy Inquiries', [
    `For privacy questions or deletion requests about Breakpoint, contact Manas Vignesh Varma at ${privacyEmail}.`,
  ]],
] as const;

export default function BreakpointPrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="mx-auto flex max-w-5xl items-center justify-between border-b border-[var(--line)] px-5 py-5">
        <Wordmark />
        <Link
          href="/"
          className="border-b-2 border-[var(--orange)] pb-1 text-xs font-black tracking-[0.12em] uppercase"
        >
          CIE Daily
        </Link>
      </header>
      <article className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <p className="mb-4 text-xs font-black tracking-[0.14em] text-[var(--orange)] uppercase">
          Effective {effectiveDate}
        </p>
        <h1 className="mb-6 font-[var(--serif)] text-5xl leading-none font-bold tracking-normal sm:text-7xl">
          Breakpoint — Privacy Policy
        </h1>
        <p className="mb-5 max-w-3xl font-[var(--serif)] text-2xl leading-snug text-[var(--ink)]">
          Breakpoint is a mobile application developed and published on Google
          Play by Manas Vignesh Varma.
        </p>
        <p className="mb-12 border-l-4 border-[var(--orange)] bg-[var(--paper-2)] px-5 py-4 text-base leading-7 text-[var(--muted)]">
          This page is hosted on the CIE Daily website for the Breakpoint mobile
          app. It is public, does not require login, and is intended to identify
          the app and developer clearly for Google Play users.
        </p>

        <div className="grid gap-10">
          {sections.map(([title, paragraphs]) => (
            <section key={title}>
              <h2 className="mb-4 border-t border-[var(--line)] pt-6 font-[var(--serif)] text-3xl leading-tight font-bold tracking-normal">
                {title}
              </h2>
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-4 text-base leading-8 text-[var(--muted)]"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
