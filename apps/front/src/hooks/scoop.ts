import { useQuery } from "@tanstack/vue-query";
import getAppInfo from "../services/scoop";

export function useAppInfo(app: string) {
  const { isLoading, data, error } = useQuery(["appInfo", app], () =>
    getAppInfo(app)
  );
  return { isLoading, data, error };
}
