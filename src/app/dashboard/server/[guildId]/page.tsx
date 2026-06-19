import { redirect } from 'next/navigation';

export default async function ServerRedirect({ params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  redirect(`/dashboard/server/${guildId}`);
}
