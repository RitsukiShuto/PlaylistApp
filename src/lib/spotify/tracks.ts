import { spotifyGet } from "./client";

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
  };
  duration_ms: number;
}

export interface SpotifyAudioFeatures {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
}

export interface TopTracksResponse {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
}

export interface AudioFeaturesResponse {
  audio_features: (SpotifyAudioFeatures | null)[];
}

/**
 * Get user's top tracks
 */
export async function getMyTopTracks(limit = 20, time_range = "medium_term"): Promise<SpotifyTrack[]> {
  const data = await spotifyGet<TopTracksResponse>(
    `/me/top/tracks?limit=${limit}&time_range=${time_range}`
  );
  return data.items;
}

/**
 * Get audio features for multiple tracks
 */
export async function getAudioFeatures(ids: string[]): Promise<SpotifyAudioFeatures[]> {
  if (ids.length === 0) return [];
  
  // Spotify API allows max 100 IDs per request
  const idChunks = [];
  for (let i = 0; i < ids.length; i += 100) {
    idChunks.push(ids.slice(i, i + 100));
  }

  const allFeatures: SpotifyAudioFeatures[] = [];

  for (const chunk of idChunks) {
    const data = await spotifyGet<AudioFeaturesResponse>(
      `/audio-features?ids=${chunk.join(",")}`
    );
    // Filter out any null entries if a track doesn't have features
    const features = data.audio_features.filter((f): f is SpotifyAudioFeatures => f !== null);
    allFeatures.push(...features);
  }

  return allFeatures;
}
