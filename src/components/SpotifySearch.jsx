import { useState } from "react";

import {
  Music2,
  Search,
} from "lucide-react";

export default function SpotifySearch() {

  const [spotifyUrl, setSpotifyUrl] =
    useState("");

  /* Convert URL */
  const getEmbedUrl = (url) => {

    if (!url) return "";

    try {

      if (
        url.includes("/track/")
      ) {

        const id =
          url.split("/track/")[1]
            ?.split("?")[0];

        return `https://open.spotify.com/embed/track/${id}`;
      }

      if (
        url.includes("/playlist/")
      ) {

        const id =
          url
            .split("/playlist/")[1]
            ?.split("?")[0];

        return `https://open.spotify.com/embed/playlist/${id}`;
      }

      if (
        url.includes("/album/")
      ) {

        const id =
          url.split("/album/")[1]
            ?.split("?")[0];

        return `https://open.spotify.com/embed/album/${id}`;
      }

      return "";

    } catch {

      return "";

    }

  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-2xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">

        <Music2 className="text-green-400" />

        <h2 className="text-2xl font-semibold">
          Spotify Workspace
        </h2>

      </div>

      {/* Search/Input */}
      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          size={20}
        />

        <input
          type="text"

          placeholder="Paste Spotify song / playlist / album link..."

          value={spotifyUrl}

          onChange={(e) =>
            setSpotifyUrl(
              e.target.value
            )
          }

          className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-green-400 transition"
        />

      </div>

      {/* Spotify Player */}
      {
        getEmbedUrl(
          spotifyUrl
        ) && (
          <iframe
            src={getEmbedUrl(
              spotifyUrl
            )}

            width="100%"

            height="500"

            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"

            loading="lazy"

            className="rounded-3xl border border-white/10"
          ></iframe>
        )
      }

      {/* Helper */}
      <p className="text-gray-500 text-sm mt-6">

        Paste any Spotify song, playlist,
        or album link to play the original
        full-length audio directly inside FlowState.

      </p>

    </div>
  );
}