// utils/config.ts

export const api = "http://localhost:3000/api";

interface RequestConfig {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

export const requestConfig = (
  method: string,
  data: any = null,
  token: string | null = null
): RequestConfig => {
  const headers: Record<string, string> = {};

  if (method !== "DELETE" && data !== null) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestConfig = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  return config;
};
