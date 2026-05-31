import { describe, it, expect, vi } from 'vitest';
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
        refresh_token: 'new-refresh-token',
      }),
    });

    // Mock environment variables
    process.env.SPOTIFY_CLIENT_ID = 'client-id';
    process.env.SPOTIFY_CLIENT_SECRET = 'client-secret';

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
