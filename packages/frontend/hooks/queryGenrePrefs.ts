import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGenrePrefs() {
  return useQuery({
    queryKey: ["genre-preferences"],
    queryFn: async () => {
      const res = await fetch("/api/dummy/genre-preferences");
      if (!res.ok) {
        throw new Error(`Failed to get genre preferences: ${res.status}`);
      }
      return res.json();
    }
  });
}

export function useToggleGenrePrefs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (genre: string) => {
      const favSongs = queryClient.getQueryData<string[]>(["genre-preferences"]);
      const isInPrefs = favSongs?.some((curGenre: string) => curGenre === genre);
      const httpMethod = isInPrefs ? "DELETE" : "PUT";
      const url = `/api/dummy/genre-preferences${isInPrefs ? `/${genre}` : ``}`;
      console.log(isInPrefs);

      const res = await fetch(url, {
        method: httpMethod,
        headers: {
          "Content-Type": "application/json"
        },
        ...(!isInPrefs && {
          body: JSON.stringify({ genre: genre })
        })
      });

      if (!res.ok) {
        throw new Error(`Failed to ${isInPrefs ? "remove" : "add"} gene preferences: ${res.status}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genre-preferences"] });
    }
  });
}