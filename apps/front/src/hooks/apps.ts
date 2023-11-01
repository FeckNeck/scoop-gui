import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { getApps, getApp, installApp, uninstallApp } from "../services/apps";
import { computed, reactive, ref } from "vue";

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
  } = useQuery(["apps", params], () => getApps(params));

  return { isLoading, apps, error, isFetching };
};

const useAppInfo = () => {
  const {
    isLoading,
    isFetching,
    data: appInfo,
    error,
  } = useQuery(["appInfo", currentApp], () => getApp(currentApp.value), {
    enabled: enabled,
  });

  return { isLoading, appInfo, error, isFetching };
};

const useInstallApp = () => {
  const queryClient = useQueryClient();

  const {
    mutate: install,
    isLoading,
    error,
  } = useMutation((app: string) => installApp(app), {
    onSuccess: () => {
      console.log("success");
      console.log(queryClient);
      queryClient.invalidateQueries(["apps"]);
    },
  });

  return { install, isLoading, error };
};

const useUninstallApp = () => {
  const queryClient = useQueryClient();

  const {
    mutate: uninstall,
    isLoading,
    error,
  } = useMutation((app: string) => uninstallApp(app), {
    onSuccess: () => {
      queryClient.invalidateQueries(["apps"]);
    },
  });

  return { uninstall, isLoading, error };
};

export {
  useApps,
  useAppInfo,
  useInstallApp,
  useUninstallApp,
  currentApp,
  params,
};
