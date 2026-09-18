import { BreakpointShareLanding } from '@/components/BreakpointShareLanding';

export default async function ListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BreakpointShareLanding kind="list" value={id} />;
}
