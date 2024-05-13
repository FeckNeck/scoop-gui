import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { getApps, getApp, installApp, uninstallApp } from "../services/apps";
import { computed, reactive, ref } from "vue";
import { AppContent } from "../types";

const currentApp = ref<string>("");
const enabled = computed(() => currentApp.value !== "");

const params = reactive({
  appName: "",
  state: "",
  bucket: "",
});

const useApps = () => {
  const {
    isLoading,
    data: apps,
    error,
    isFetching,
  } = useQuery({ queryKey: ["apps", params], queryFn: () => getApps(params) });

  return { isLoading, apps, error, isFetching };
};

const useAppInfo = () => {
  const {
    isLoading,
    isFetching,
    data: appInfo,
    error,
  } = useQuery<AppContent>({
    queryKey: ["appInfo", currentApp],
    queryFn: () => getApp(currentApp.value),
    enabled: enabled,
  });

  return { isLoading, appInfo, error, isFetching };
};

const useInstallApp = () => {
  const queryClient = useQueryClient();

  const { mutate: install } = useMutation({
    mutationFn: (app: string) => installApp(app),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["apps"] }),
  });

  return { install };
};

const useUninstallApp = () => {
  const queryClient = useQueryClient();

  const { mutate: uninstall } = useMutation({
    mutationFn: (app: string) => uninstallApp(app),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["apps"] }),
  });

  return { uninstall };
};

export {
  useApps,
  useAppInfo,
  useInstallApp,
  useUninstallApp,
  currentApp,
  params,
};
