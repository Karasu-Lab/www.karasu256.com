import { NextResponse } from 'next/server';

/**
 * Microsoft identity association for this host. The application ID is a
 * public value, so it is returned as-is without configuration.
 *
 * GET /.well-known/microsoft-identity-association.json
 */
export async function GET() {
  return NextResponse.json({
    associatedApplications: [
      {
        applicationId: '3f583452-5b65-49a0-8df6-99264d2d876f',
      },
    ],
  });
}
