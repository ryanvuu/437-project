import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useDisplayName() {
  return useQuery({
    queryKey: ["display-name"],
    queryFn: async () => {
      const res = await fetch("/api/dummy/profile/display-name");
      if (!res.ok) {
        throw new Error(`Failed to get user display name: ${res.status}`);
      }
      return res.json();
    }
  });
}

export function useUpdateDisplayName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newName: string) => {
      const res = await fetch("/api/dummy/profile/display-name", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
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