"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { FormField, fieldInputClasses } from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { api } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await api.post("/auth/login", { email, password });
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-blush bg-white p-8">
      <FormField label="Email" htmlFor="email">
        <input id="email" name="email" type="email" autoComplete="email" required className={fieldInputClasses()} />
      </FormField>

      <FormField label="Password" htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldInputClasses()}
        />
      </FormField>

      {error ? <p className="text-sm text-coral-deep">{error}</p> : null}

      <Button type="submit" disabled={loading} className="w-full">
        <LogIn className="h-4 w-4" />
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
