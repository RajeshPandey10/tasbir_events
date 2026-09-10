"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface AdminSession {
  name: string;
  email: string;
}

export function useRequireAdmin() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api
      .get<AdminSession>("/auth/me")
      .then(setAdmin)
      .catch(() => router.replace("/admin/login"))
      .finally(() => setChecking(false));
  }, [router]);

  return { admin, checking };
}
