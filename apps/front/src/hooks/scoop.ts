import { useQuery } from "@tanstack/vue-query";
import { getScoopStatus } from "../services/scoop";

export function useScoopStatus() {
  const {
    isLoading,
    data: status,
    error,
  } = useQuery(["status"], () => getScoopStatus());
  return { isLoading, status, error };
}
