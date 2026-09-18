import { BreakpointShareLanding } from '@/components/BreakpointShareLanding';

export default async function ConnectPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <BreakpointShareLanding kind="connect" value={code} />;
}
