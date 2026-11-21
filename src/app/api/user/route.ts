import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { requireSession } from '@/lib/api/require-session';
import { fetchUserProfile, updateUserProfile } from '@/lib/api/user-profile';

const patchBodySchema = z.object({ name: z.string().optional() });

export async function GET() {
  const { user, error } = await requireSession();
  if (error) return error;

  const profile = await fetchUserProfile(user.uid);
  if (!profile) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json(profile);
}

export async function PATCH(request: NextRequest) {
  const { user, error } = await requireSession();
  if (error) return error;

  const parsed = patchBodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'name must be a string' }, { status: 400 });
  }

  const updated = await updateUserProfile(user.uid, parsed.data.name ?? null);
  if (!updated) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json(updated);
}
