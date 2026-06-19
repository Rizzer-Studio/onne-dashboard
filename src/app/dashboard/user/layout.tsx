import { AppShell } from '@/components/AppShell';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppShell mode="user">{children}</AppShell>;
}
