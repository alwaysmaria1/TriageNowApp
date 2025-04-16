import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export function getCurrentUser() {
  const user = useQuery(api.users.viewer);

  return {
    user
  }
}