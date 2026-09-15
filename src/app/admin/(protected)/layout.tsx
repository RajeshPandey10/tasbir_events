"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/ui/Toast";
import { useRequireAdmin } from "@/lib/auth";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { admin, checking } = useRequireAdmin();
  const pathname = usePathname();

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-blush border-t-coral" />
          <p className="text-sm text-ink/50">Checking session...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <ToastProvider>
      <div className="flex h-dvh flex-col overflow-hidden bg-ivory md:flex-row">
        <AdminSidebar adminName={admin.name} />
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ToastProvider>
  );
}
