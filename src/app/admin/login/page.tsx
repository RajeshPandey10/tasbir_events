import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ivory px-6">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-blush)_0%,transparent_55%)]"
      />
      <div className="relative flex w-full max-w-sm flex-col items-center gap-8">
        <Logo />
        <LoginForm />
        <p className="text-xs text-ink/40">Tasbir Events · Admin panel</p>
      </div>
    </div>
  );
}
