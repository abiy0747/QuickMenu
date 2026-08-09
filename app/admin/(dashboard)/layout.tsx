import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F6F6F3] dark:bg-[#08080A]">
      <AdminSidebar
        user={{
          name: session.user.name,
          email: session.user.email,
        }}
      />

      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}
