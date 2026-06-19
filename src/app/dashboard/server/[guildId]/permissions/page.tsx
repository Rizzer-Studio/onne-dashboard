import { redirect } from 'next/navigation';

export default async function ServerpermissionsRedirect({ params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;
  redirect(`/dashboard/server/${guildId}/permissions`);
}
