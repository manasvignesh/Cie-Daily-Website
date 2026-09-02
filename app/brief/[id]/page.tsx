import { QuickBriefReader } from '@/components/QuickBriefReader';

export default async function BriefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <QuickBriefReader id={id} />;
}
