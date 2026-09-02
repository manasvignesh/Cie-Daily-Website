import { EditorialFeed } from '@/components/EditorialFeed';

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  return <EditorialFeed topic={topic} />;
}
