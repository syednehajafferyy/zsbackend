type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ApiResult = { ok: boolean; status: number; data: Record<string, unknown>; error: string; fields?: Record<string, string[]> };
/** Browser request to same-origin /api/* (proxied to the backend by next.config.mjs). */
export async function send(url: string, method: Method, body?: unknown): Promise<ApiResult> {
  try {
    const fd = body instanceof FormData;
    const res = await fetch(url, { method, credentials: "same-origin", headers: body && !fd ? { "Content-Type": "application/json" } : undefined, body: body === undefined ? undefined : fd ? (body as FormData) : JSON.stringify(body) });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: res.ok, status: res.status, data, error: (data.error as string) ?? (res.ok ? "" : "Request failed."), fields: data.fields as Record<string, string[]> | undefined };
  } catch { return { ok: false, status: 0, data: {}, error: "Network error. Please try again." }; }
}
