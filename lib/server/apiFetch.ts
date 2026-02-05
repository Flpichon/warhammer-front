// eviter d'importer ces modules dans les composants 'use client'
import "server-only";
import { ApiError } from "@/lib/shared/apiError";
type ApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  token?: string;
  body?: unknown;
  cache?: RequestCache;
  signal?: AbortSignal;
  next?: {
    tags?: string[];
    revalidate?: number | false;
  };
};
function getBaseUrl(): string {
  const baseUrl = process.env.WARHAMMER_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("WARHAMMER_API_BASE_URL is not set (check .env.local)");
  }
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}
function joinUrl(path: string): string {
  const base = getBaseUrl();
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return new URL(normalized, base).toString();
}
function extractMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }
  const msg = (payload as { message?: unknown }).message;
  if (typeof msg === "string" && msg.trim()) {
    return msg;
  }
  if (Array.isArray(msg) && msg.every((x) => typeof x === "string")) {
    const joined = msg.filter((x) => x.trim()).join("; ");
    return joined || undefined;
  }
  return undefined;
}
export async function apiFetch<T>(
  path: string,
  opts: ApiFetchOptions = {},
): Promise<T> {
  const url = joinUrl(path);
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (opts.token) {
    headers.Authorization = `Bearer ${opts.token}`;
  }
  let body: string | undefined;
  if (opts.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.body);
  }
  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers,
    body,
    cache: opts.cache ?? "no-store",
    signal: opts.signal,
    next: opts.next,
  });
  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await res.json().catch(() => undefined) : undefined;
  if (!res.ok) {
    const message =
      extractMessage(payload) ??
      (res.status === 401 ? "Unauthorized" : "Request failed");
    throw new ApiError({
      status: res.status,
      message,
      details: payload,
    });
  }
  if (res.status === 204) {
    return undefined as T;
  }
  if (!isJson) {
    throw new ApiError({
      status: 500,
      message: "Expected JSON response from API",
      details: { url, contentType },
    });
  }
  return payload as T;
}
