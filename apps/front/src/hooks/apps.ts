import { useQuery } from "@tanstack/vue-query";
import { getApps, getApp } from "../services/apps";

export function useApps() {
  const { isLoading, data: apps, error } = useQuery(["apps"], () => getApps());
  return { isLoading, apps, error };
}

export function useAppInfo(app: string) {
  const {
    isLoading,
    data: info,
    error,
  } = useQuery(["appInfo", app], () => getApp(app));
  return { isLoading, info, error };
}
