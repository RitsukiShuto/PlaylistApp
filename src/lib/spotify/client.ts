import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export async function spotifyFetch(endpoint: string, options: RequestInit = {}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    throw new Error("No access token found in session");
  }

  const url = endpoint.startsWith("http") 
    ? endpoint 
    : `${SPOTIFY_API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.user.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    // Note: NextAuth handles token refresh in the jwt callback,
    // so a 401 here might mean the refresh failed or the token is revoked.
    throw new Error("Spotify API unauthorized. Please sign in again.");
  }

  return response;
}

export async function spotifyGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await spotifyFetch(endpoint, { ...options, method: "GET" });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Spotify API error: ${response.status}`);
  }

  return response.json();
}
