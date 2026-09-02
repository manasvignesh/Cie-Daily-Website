import { ArticleReader } from '@/components/ArticleReader';

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticleReader id={id} />;
}
