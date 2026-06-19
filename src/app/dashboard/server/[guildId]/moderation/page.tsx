import { redirect } from 'next/navigation';

export default async function ServermoderationRedirect({ params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  redirect(`/dashboard/server/${guildId}/moderation`);
}
