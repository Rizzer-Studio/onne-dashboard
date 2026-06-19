import { AppShell } from '@/components/AppShell';

export default async function ServerDashboardLayout({ children, params }: { children: React.ReactNode; params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  return <AppShell mode="server" selectedGuildId={guildId}>{children}</AppShell>;
}
