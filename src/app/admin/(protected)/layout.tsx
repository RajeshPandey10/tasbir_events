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
      <div className="flex min-h-screen bg-ivory">
        <AdminSidebar adminName={admin.name} />
        <div className="flex-1 px-10 py-10">{children}</div>
      </div>
    </ToastProvider>
  );
}
