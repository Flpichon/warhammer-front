import 'server-only';
import { apiFetch } from '@/lib/server/apiFetch';
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '@/lib/server/cookies';
import { ApiError } from '@/lib/shared/apiError';
export type UserResponse = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
type AuthTokenResponse = {
  accessToken: string;
  user: UserResponse;
};
export async function register(params: {
  email: string;
  password: string;
}): Promise<UserResponse> {
  const res = await apiFetch<AuthTokenResponse>('/auth/register', {
    method: 'POST',
    body: { email: params.email, password: params.password },
  });
  await setAccessToken(res.accessToken);
  return res.user;
}
export async function login(params: {
  email: string;
  password: string;
}): Promise<UserResponse> {
  const res = await apiFetch<AuthTokenResponse>('/auth/login', {
    method: 'POST',
    body: { email: params.email, password: params.password },
  });
  await setAccessToken(res.accessToken);
  return res.user;
}
export async function me(): Promise<UserResponse | null> {
  const token = await getAccessToken();
  if (!token) {
    return null;
  }
  try {
    const res = await apiFetch<{ user: UserResponse }>('/auth/me', { token });
    return res.user;
  } catch (err) {
    // Token invalide/expire -> on nettoie la session et on considere "logged out"
    if (err instanceof ApiError && err.status === 401) {
      return null;
    }
    throw err;
  }
}
export async function logout(): Promise<void> {
  await clearAccessToken();
}
