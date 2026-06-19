import { redirect } from 'next/navigation';

export default async function ServereconomyRedirect({ params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  redirect(`/dashboard/server/${guildId}/economy`);
}
