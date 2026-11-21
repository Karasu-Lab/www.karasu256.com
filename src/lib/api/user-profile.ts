import { userProfileSchema, type UserProfile } from '@karasu-lab/types/shared';
import { MissingEnvError, signRequest, vercelProtectionBypassHeaders } from '@karasu-lab/utils/server';

async function internalProfileFetch(userId: string, init: { method: 'GET' | 'PATCH'; body?: string }): Promise<Response> {
  const secret = process.env.INTERNAL_API_SECRET;
  if (!secret) throw new MissingEnvError('INTERNAL_API_SECRET');
  const authApiUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
  if (!authApiUrl) throw new MissingEnvError('NEXT_PUBLIC_AUTH_API_URL');

  const url = `${authApiUrl}/api/internal/users/${encodeURIComponent(userId)}/profile`;
  return fetch(url, {
    method: init.method,
    body: init.body,
    headers: {
      ...(init.body !== undefined ? { 'content-type': 'application/json' } : {}),
      ...vercelProtectionBypassHeaders(process.env.VERCEL_PROTECTION_BYPASS_SECRET),
      ...signRequest({ secret, method: init.method, url, body: init.body }),
    },
    cache: 'no-store',
  });
}

/**
 * Reads a user's profile from api-auth.karasu256.com.
 *
 * @returns the profile, or `null` when the user does not exist.
 * @throws {Error} When api-auth responds with a status other than 200 or 404.
 */
export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  const res = await internalProfileFetch(userId, { method: 'GET' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`api-auth responded ${res.status} for ${res.url}`);
  return userProfileSchema.parse(await res.json());
}

/**
 * Updates a user's profile name through api-auth.karasu256.com.
 *
 * @returns the updated profile, or `null` when the user does not exist.
 * @throws {Error} When api-auth responds with a status other than 200 or 404.
 */
export async function updateUserProfile(userId: string, name: string | null): Promise<UserProfile | null> {
  const res = await internalProfileFetch(userId, { method: 'PATCH', body: JSON.stringify({ name }) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`api-auth responded ${res.status} for ${res.url}`);
  return userProfileSchema.parse(await res.json());
}
