import 'server-only';
import { apiFetch } from '@/lib/server/apiFetch';
import { getAccessToken } from '@/lib/server/cookies';
import {
  CreateMarineInput,
  FindMarinesFilters,
  Marine,
  UpdateMarineInput,
} from '../shared/marines.types';

function buildMarinesQuery(filters: FindMarinesFilters = {}) {
  return {
    rank: filters.rank,
    chapter: filters.chapter,
    squadId: filters.squadId,
  };
}

async function requireToken(): Promise<string> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Missing access token');
  }
  return token;
}

export async function listMarines(
  filters: FindMarinesFilters = {},
): Promise<Marine[]> {
  const token = await requireToken();
  return apiFetch<Marine[]>('/marines', {
    token,
    query: buildMarinesQuery(filters),
  });
}

export async function getMarineById(id: string): Promise<Marine | null> {
  const token = await requireToken();
  return apiFetch<Marine | null>(`/marines/${id}`, { token });
}

export async function createMarine(input: CreateMarineInput): Promise<Marine> {
  const token = await requireToken();
  return apiFetch<Marine>('/marines', {
    method: 'POST',
    token,
    body: input,
  });
}

export async function updateMarine(
  id: string,
  input: UpdateMarineInput,
): Promise<Marine | null> {
  const token = await requireToken();
  return apiFetch<Marine | null>(`/marines/${id}`, {
    method: 'PATCH',
    token,
    body: input,
  });
}

export async function deleteMarine(id: string): Promise<boolean> {
  const token = await requireToken();
  return apiFetch<boolean>(`/marines/${id}`, {
    method: 'DELETE',
    token,
  });
}
