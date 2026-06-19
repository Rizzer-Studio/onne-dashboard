import { AppShell } from '@/components/AppShell';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppShell mode="admin">{children}</AppShell>;
}
