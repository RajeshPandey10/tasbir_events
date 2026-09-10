const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface RequestOptions extends RequestInit {
  json?: unknown;
}

async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers, ...rest } = options;

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      ...(json ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : rest.body,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }

  return response.json();
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path, { method: "GET", cache: "no-store" }),
  post: <T>(path: string, json?: unknown) => apiFetch<T>(path, { method: "POST", json }),
  postForm: <T>(path: string, formData: FormData) => apiFetch<T>(path, { method: "POST", body: formData }),
  put: <T>(path: string, json?: unknown) => apiFetch<T>(path, { method: "PUT", json }),
  patch: <T>(path: string, json?: unknown) => apiFetch<T>(path, { method: "PATCH", json }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" }),
};
