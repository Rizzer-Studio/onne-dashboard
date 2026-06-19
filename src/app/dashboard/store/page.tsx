import { redirect } from 'next/navigation';

export default function storeRedirect() {
  redirect('/dashboard/user/store');
}
