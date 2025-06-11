import { useQuery } from "@tanstack/react-query";

export function useSongs(authToken: string) {
  return useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      const res = await fetch("/api/songs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
      
      if (!res.ok) {
        throw new Error(`Failed to get songs: ${res.status}`);
      }
      return res.json();
    },
    enabled: !!authToken
  })
}