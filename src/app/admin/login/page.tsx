import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <Logo />
        <LoginForm />
      </div>
    </div>
  );
}
