import { useQuery } from "@tanstack/vue-query";
import {
  getApps,
  getApp,
  getAvailableApps,
  getInstalledApps,
} from "../services/apps";
import { computed, ref } from "vue";

const selectedApp = ref<string>("");
const enabled = computed(() => selectedApp.value !== "");

const useApps = () => {
  const { isLoading, data: apps, error } = useQuery(["apps"], () => getApps());
  return { isLoading, apps, error };
};

const useInstalledApps = () => {
  const {
    isLoading,
    data: installedApps,
    error,
  } = useQuery(["installedApps"], () => getInstalledApps());
  return { isLoading, installedApps, error };
};

const useAvailableApps = () => {
  const {
    isLoading,
    data: availableApps,
    error,
  } = useQuery(["availableApps"], () => getAvailableApps());
  return { isLoading, availableApps, error };
};

const useAppInfo = () => {
  const {
    isLoading,
    isFetching,
    data: appInfo,
    error,
  } = useQuery(["appInfo", selectedApp], () => getApp(selectedApp.value), {
    enabled: enabled,
  });
  return { isLoading, appInfo, error, isFetching };
};

export { useApps, useInstalledApps, useAppInfo, useAvailableApps, selectedApp };
