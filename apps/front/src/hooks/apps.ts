import { useQuery } from "@tanstack/vue-query";
import {
  getApps,
  getApp,
  getAvailableApps,
  getInstalledApps,
} from "../services/apps";

const useApps = () => {
  const { isLoading, data: apps, error } = useQuery(["apps"], () => getApps());
  return { isLoading, apps, error };
};

const useInstalledApps = () => {
  const {
    isLoading,
    data: apps,
    error,
  } = useQuery(["installedApps"], () => getInstalledApps());
  return { isLoading, apps, error };
};

const useAvailableApps = () => {
  const {
    isLoading,
    data: apps,
    error,
  } = useQuery(["availableApps"], () => getAvailableApps());
  return { isLoading, apps, error };
};

const useAppInfo = (app: string) => {
  const {
    isLoading,
    data: info,
    error,
  } = useQuery(["appInfo", app], () => getApp(app));
  return { isLoading, info, error };
};

export { useApps, useInstalledApps, useAppInfo, useAvailableApps };
