import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export function useUserbyID(id: string) {
  const user = useQuery(api.users.getOne, { userID: id });

  return {
    user
  }
}