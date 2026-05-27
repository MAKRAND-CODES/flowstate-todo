import axios from "axios";

const CLIENT_ID =
  import.meta.env
    .VITE_SPOTIFY_CLIENT_ID;

const CLIENT_SECRET =
  import.meta.env
    .VITE_SPOTIFY_CLIENT_SECRET;

/* ACCESS TOKEN */
const getAccessToken =
  async () => {

    try {

      const response =
        await axios.post(
          "https://accounts.spotify.com/api/token",

          new URLSearchParams({
            grant_type:
              "client_credentials",
          }),

          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",

              Authorization:
                "Basic " +
                btoa(
                  `${CLIENT_ID}:${CLIENT_SECRET}`
                ),
            },
          }
        );

      return response.data
        .access_token;

    } catch (error) {

      console.log(
        "TOKEN ERROR:",
        error.response?.data ||
          error.message
      );

    }
  };

/* SEARCH TRACKS */
export const searchTracks =
  async (query) => {

    try {

      const token =
        await getAccessToken();

      const response =
        await axios.get(
          "https://api.spotify.com/v1/search",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            params: {
              q: query,
              type: "track",
              limit: 10,
            },
          }
        );

      return response.data
        .tracks.items;

    } catch (error) {

      console.log(
        "SEARCH ERROR:",
        error.response?.data ||
          error.message
      );

      return [];
    }
  };