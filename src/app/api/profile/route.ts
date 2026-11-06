import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { getDb } from '@karasu-lab/db';
import { users } from '@karasu-lab/db/schema';
import { APIKeyRoute, OauthAppRoute, RequirePermission } from '@/lib/api/route-auth';

const patchBodySchema = z.object({ name: z.string().nullable() });

export const GET = APIKeyRoute()(
  OauthAppRoute()(
    RequirePermission('users:profile.read')(async (_request, _ctx, auth) => {
      const db = getDb();
      const [user] = await db.select({ id: users.id, name: users.name }).from(users).where(eq(users.id, auth.userId));

      if (!user) return NextResponse.json({ error: 'not_found' }, { status: 404 });

      return NextResponse.json({ id: user.id, name: user.name });
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
      const { name } = parsed.data;

      const db = getDb();
      const [updated] = await db
        .update(users)
        .set({ name: name ?? null, updatedAt: new Date() })
        .where(eq(users.id, auth.userId))
        .returning({ id: users.id, name: users.name });

      if (!updated) return NextResponse.json({ error: 'not_found' }, { status: 404 });
      return NextResponse.json({ id: updated.id, name: updated.name });
    })
  )
);
