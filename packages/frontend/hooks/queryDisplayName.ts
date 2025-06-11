import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useDisplayName(authToken: string) {
  return useQuery({
    queryKey: ["display-name"],
    queryFn: async () => {
      const res = await fetch("/api/profile/display-name", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
      if (!res.ok) {
        throw new Error(`Failed to get user display name: ${res.status}`);
      }
      return res.json();
    },
    enabled: !!authToken
  });
}

export function useUpdateDisplayName(authToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newName: string) => {
      const res = await fetch("/api/profile/display-name", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ newName: newName })
      });

      if (!res.ok) {
        throw new Error(`Failed to update display name: ${res.status}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["display-name"] });
    }
  });
}