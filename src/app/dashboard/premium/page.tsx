import { redirect } from 'next/navigation';

export default function premiumRedirect() {
  redirect('/dashboard/user/premium');
}
