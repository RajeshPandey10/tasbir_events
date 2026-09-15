"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/ui/Toast";
import { useRequireAdmin } from "@/lib/auth";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { admin, checking } = useRequireAdmin();

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <p className="text-sm text-ink/50">Checking session...</p>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-ivory md:flex-row">
        <AdminSidebar adminName={admin.name} />
        <div className="min-w-0 flex-1 px-4 py-6 md:px-10 md:py-10">{children}</div>
      </div>
    </ToastProvider>
  );
}
