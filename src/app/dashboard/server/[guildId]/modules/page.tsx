import { redirect } from 'next/navigation';

export default async function ServermodulesRedirect({ params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  redirect(`/dashboard/server/${guildId}/modules`);
}
