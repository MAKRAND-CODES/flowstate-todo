import { useState, useEffect } from "react";
import {
  Music2,
  ChevronDown,
  ChevronUp,
  Play,
  Trash2,
} from "lucide-react";

export default function GlobalMusicPlayer() {
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [open, setOpen] = useState(true);
  const [recent, setRecent] = useState([]);

  /* Convert URL → Embed */
  const getEmbedUrl = (url) => {
    if (!url) return "";

    try {
      if (url.includes("/track/")) {
        const id = url.split("/track/")[1]?.split("?")[0];
        return `https://open.spotify.com/embed/track/${id}`;
      }

      if (url.includes("/playlist/")) {
        const id = url.split("/playlist/")[1]?.split("?")[0];
        return `https://open.spotify.com/embed/playlist/${id}`;
      }

      if (url.includes("/album/")) {
        const id = url.split("/album/")[1]?.split("?")[0];
        return `https://open.spotify.com/embed/album/${id}`;
      }

      return "";
    } catch {
      return "";
    }
  };

  const embedUrl = getEmbedUrl(spotifyUrl);

  /* Save to recently played */
  useEffect(() => {
    if (embedUrl && spotifyUrl) {
      setRecent((prev) => {
        const updated = [spotifyUrl, ...prev.filter((u) => u !== spotifyUrl)];
        return updated.slice(0, 5);
      });
    }
  }, [embedUrl]);

  const playFromRecent = (url) => {
    setSpotifyUrl(url);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-3xl px-6">

      <div className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Music2 className="text-green-400" />
            <h2 className="font-semibold">Global Music Player</h2>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
          >
            {open ? <ChevronDown /> : <ChevronUp />}
          </button>
        </div>

        {/* INPUT */}
        <div className="px-5 pb-3">
          <input
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
            placeholder="Paste Spotify track / playlist / album link..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm"
          />
        </div>

        {/* PLAYER (IMPORTANT: ALWAYS MOUNTED) */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            open ? "max-h-[600px]" : "max-h-[0px]"
          }`}
        >
          {/* KEEP IFRAME ALWAYS LOADED → prevents music stop */}
          <div className="px-5 pb-4">
            <iframe
              src={embedUrl}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl border border-white/10"
            />
          </div>

          {/* RECENTLY PLAYED */}
          {recent.length > 0 && (
            <div className="px-5 pb-5">
              <p className="text-xs text-gray-400 mb-2">Recently Played</p>

              <div className="flex gap-2 flex-wrap">
                {recent.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => playFromRecent(url)}
                    className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs"
                  >
                    <Play size={12} />
                    Track {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setRecent([])}
                className="mt-2 flex items-center gap-1 text-xs text-red-400"
              >
                <Trash2 size={12} />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}