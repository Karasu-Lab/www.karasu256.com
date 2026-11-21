import { NextResponse } from 'next/server';
import { z } from 'zod';
import { APIKeyRoute, OauthAppRoute, RequirePermission } from '@/lib/api/route-auth';
import { fetchUserProfile, updateUserProfile } from '@/lib/api/user-profile';

const patchBodySchema = z.object({ name: z.string().nullable() });

export const GET = APIKeyRoute()(
  OauthAppRoute()(
    RequirePermission('users:profile.read')(async (_request, _ctx, auth) => {
      const profile = await fetchUserProfile(auth.userId);
      if (!profile) return NextResponse.json({ error: 'not_found' }, { status: 404 });

      return NextResponse.json(profile);
    })
  )
);

export const PATCH = APIKeyRoute()(
  OauthAppRoute()(
    RequirePermission('users:profile.write')(async (request, _ctx, auth) => {
      const parsed = patchBodySchema.safeParse(await request.json());
      if (!parsed.success) {
        return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
      }

      const updated = await updateUserProfile(auth.userId, parsed.data.name);
      if (!updated) return NextResponse.json({ error: 'not_found' }, { status: 404 });
      return NextResponse.json(updated);
    })
  )
);
