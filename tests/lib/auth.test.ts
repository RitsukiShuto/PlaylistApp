import { describe, it, expect, vi, beforeEach } from 'vitest';

// We will export refreshAccessToken from src/lib/auth.ts
// But for now, it's not implemented or exported, so this will fail to even compile/import
// @ts-ignore - Ignore compilation error for now as we are doing TDD
import { refreshAccessToken } from '../../src/lib/auth';

describe('refreshAccessToken', () => {
  it('successfully refreshes the access token', async () => {
    const token = {
      accessToken: 'expired-token',
      refreshToken: 'valid-refresh-token',
      accessTokenExpires: Date.now() - 1000,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        access_token: 'new-access-token',
        expires_in: 3600,
        refresh_token: 'new-refresh-token', // Optional by Spotify, but we should handle it
      }),
    });

    const refreshedToken = await refreshAccessToken(token as any);

    expect(refreshedToken).toEqual({
      ...token,
      accessToken: 'new-access-token',
      accessTokenExpires: expect.any(Number),
      refreshToken: 'new-refresh-token',
    });
  });

  it('returns error if refresh fails', async () => {
     global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'invalid_grant' }),
    });

    const token = {
      accessToken: 'expired-token',
      refreshToken: 'invalid-refresh-token',
    };

    const refreshedToken = await refreshAccessToken(token as any);
    expect(refreshedToken).toHaveProperty('error', 'RefreshAccessTokenError');
  });
});
