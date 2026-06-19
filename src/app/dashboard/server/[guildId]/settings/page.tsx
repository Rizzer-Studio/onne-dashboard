import { redirect } from 'next/navigation';

export default async function ServersettingsRedirect({ params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  redirect(`/dashboard/server/${guildId}/settings`);
}
