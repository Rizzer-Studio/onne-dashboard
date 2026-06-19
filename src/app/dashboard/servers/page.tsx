import { redirect } from 'next/navigation';

export default function serversRedirect() {
  redirect('/dashboard/user/servers');
}
