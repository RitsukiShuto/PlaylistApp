import { getMyTopTracks, getAudioFeatures } from "@/lib/spotify/tracks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const tracks = await getMyTopTracks(10);
  const trackIds = tracks.map((t) => t.id);
  const features = await getAudioFeatures(trackIds);

  // Combine track info with its features
  const tracksWithFeatures = tracks.map((track) => {
    const feature = features.find((f) => f.id === track.id);
    return { ...track, feature };
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Top Tracks & Features</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="px-4 py-2 text-left">Track</th>
              <th className="px-4 py-2 text-left">Artist</th>
              <th className="px-4 py-2 text-center">Danceability</th>
              <th className="px-4 py-2 text-center">Energy</th>
              <th className="px-4 py-2 text-center">Valence</th>
              <th className="px-4 py-2 text-center">Tempo</th>
            </tr>
          </thead>
          <tbody>
            {tracksWithFeatures.map((item) => (
              <tr key={item.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="px-4 py-2 font-medium">{item.name}</td>
                <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                  {item.artists.map((a) => a.name).join(", ")}
                </td>
                <td className="px-4 py-2 text-center">{item.feature?.danceability.toFixed(2) || "-"}</td>
                <td className="px-4 py-2 text-center">{item.feature?.energy.toFixed(2) || "-"}</td>
                <td className="px-4 py-2 text-center">{item.feature?.valence.toFixed(2) || "-"}</td>
                <td className="px-4 py-2 text-center">{item.feature?.tempo.toFixed(0) || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
