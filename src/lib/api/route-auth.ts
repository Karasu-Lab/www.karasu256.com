import { oauthProviderResourceClient } from '@better-auth/oauth-provider/resource-client';
import { vercelProtectionBypassHeaders } from '@karasu-lab/utils/server';
import { createRouteAuth } from '@karasu-lab/utils/server/route-guards';

const OAUTH_ISSUER = `${process.env.OAUTH_ISSUER_URL}/api/auth`;

const resourceClient = oauthProviderResourceClient();

interface VerifiedApiKey {
  userId: string;
  operations: { operation: string; permissions: string[] }[];
}

async function validateApiKey(token: string): Promise<{ userId: string; permissionIds: string[] } | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/api-keys/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...vercelProtectionBypassHeaders(process.env.VERCEL_PROTECTION_BYPASS_SECRET) },
      body: JSON.stringify({ key: token }),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const { userId, operations } = (await res.json()) as VerifiedApiKey;
    const permissionIds = operations.flatMap(({ operation, permissions }) => permissions.map((permission) => `${operation}:${permission}`));
    return { userId, permissionIds };
  } catch {
    return null;
  }
}
async function validateOauthToken(token: string): Promise<{ userId: string; scopes: string[] } | null> {
  try {
    const payload = await resourceClient.getActions().verifyBearerToken(token, {
      verifyOptions: { audience: OAUTH_ISSUER, issuer: OAUTH_ISSUER },
      jwksUrl: `${OAUTH_ISSUER}/jwks`,
    });
    if (!payload.sub) return null;
    const scopes = typeof payload.scope === 'string' ? payload.scope.split(' ') : [];
    return { userId: payload.sub, scopes };
  } catch {
    return null;
  }
}

export const { APIKeyRoute, OauthAppRoute, RequirePermission } = createRouteAuth({
  validator: { validateApiKey, validateOauthToken },
});
