
import { AppHeader } from "@/components/food-reels/header";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="pt-16">{children}</main>
    </div>
  );
}
