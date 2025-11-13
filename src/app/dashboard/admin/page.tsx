
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome, Admin! This is where you can manage users, content, and the overall application.</p>
          <p className="mt-4 text-muted-foreground">Future features will include user management tables, content moderation tools, and site analytics.</p>
        </CardContent>
      </Card>
    </div>
  );
}
