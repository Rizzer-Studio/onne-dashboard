import { redirect } from 'next/navigation';

export default async function ServerLogsAliasPage({ params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  redirect(`/dashboard/server/${guildId}/logs`);
}
