import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IApiSongData } from "../../backend/src/common/ApiSongData";

export function useFavorites(authToken: string) {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("/api/favorites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
      if (!res.ok) {
        throw new Error(`Failed to get favorites: ${res.status}`);
      }
      return res.json();
    },
    enabled: !!authToken
  });
}

export function useToggleFavorite(authToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (song: IApiSongData) => {
      const favSongs = queryClient.getQueryData<IApiSongData[]>(["favorites"]);
      const isFavorited = favSongs?.some((favSong: IApiSongData) => song.id === favSong.id);
      const httpMethod = isFavorited ? "DELETE" : "PUT";
      const url = `/api/favorites${isFavorited ? `/${song.id}` : ``}`;
      console.log(isFavorited);

      const res = await fetch(url, {
        method: httpMethod,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        ...(!isFavorited && {
          body: JSON.stringify({ songId: song.id })
        })
      });

      if (!res.ok) {
        throw new Error(`Failed to ${isFavorited ? "remove" : "add"} favorite: ${res.status}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    }
  });
}