import { describe, it, expect, vi, beforeEach } from "vitest";
import { getMyTopTracks, getAudioFeatures } from "@/lib/spotify/tracks";
import * as client from "@/lib/spotify/client";

vi.mock("@/lib/spotify/client", () => ({
  spotifyGet: vi.fn(),
}));

describe("Spotify Library", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getMyTopTracks", () => {
    it("should fetch top tracks correctly", async () => {
      const mockTracks = {
        items: [{ id: "1", name: "Track 1", artists: [{ name: "Artist 1" }] }],
      };
      vi.mocked(client.spotifyGet).mockResolvedValue(mockTracks);

      const tracks = await getMyTopTracks();
      
      expect(client.spotifyGet).toHaveBeenCalledWith(expect.stringContaining("/me/top/tracks"));
      expect(tracks).toEqual(mockTracks.items);
    });
  });

  describe("getAudioFeatures", () => {
    it("should fetch audio features and filter nulls", async () => {
      const mockFeatures = {
        audio_features: [
          { id: "1", danceability: 0.8 },
          null, // Test filtering
          { id: "2", danceability: 0.5 },
        ],
      };
      vi.mocked(client.spotifyGet).mockResolvedValue(mockFeatures);

      const features = await getAudioFeatures(["1", "2", "3"]);

      expect(client.spotifyGet).toHaveBeenCalledWith(expect.stringContaining("/audio-features?ids=1,2,3"));
      expect(features).toHaveLength(2);
      expect(features[0].id).toBe("1");
    });

    it("should handle empty ID list", async () => {
      const features = await getAudioFeatures([]);
      expect(features).toEqual([]);
      expect(client.spotifyGet).not.toHaveBeenCalled();
    });
  });
});
