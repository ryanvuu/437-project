import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IApiSongData } from "../../backend/src/common/ApiSongData";

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("/api/dummy/favorites");
      if (!res.ok) {
        throw new Error(`Failed to get favorites: ${res.status}`);
      }
      return res.json();
    }
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (song: IApiSongData) => {
      const favSongs = queryClient.getQueryData<IApiSongData[]>(["favorites"]);
      const isFavorited = favSongs?.some((favSong: IApiSongData) => song.id === favSong.id);
      const httpMethod = isFavorited ? "DELETE" : "PUT";
      const url = `/api/dummy/favorites${isFavorited ? `/${song.id}` : ``}`;
      console.log(isFavorited);

      const res = await fetch(url, {
        method: httpMethod,
        headers: {
          "Content-Type": "application/json"
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