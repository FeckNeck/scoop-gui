import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import {
  getScoopStatus,
  getScoopCache,
  checkScoop,
  exportScoop,
  importScoop,
  updateScoop,
} from "../services/scoop";
import { save } from "@tauri-apps/api/dialog";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";

export function useScoopStatus() {
  const {
    isLoading,
    data: appsToUpdate,
    error,
  } = useQuery({
    queryKey: ["status"],
    queryFn: () => getScoopStatus(),
    refetchInterval: 180000,
  });
  return { isLoading, appsToUpdate, error };
}

export function useScoopCache() {
  const {
    isLoading,
    data: cache,
    error,
  } = useQuery({
    queryKey: ["cache"],
    queryFn: () => getScoopCache(),
    refetchInterval: 180000,
  });

  return { isLoading, cache, error };
}

export function useScoopCheck() {
  const {
    isLoading,
    data: isScoopInstalled,
    error,
  } = useQuery({ queryKey: ["check"], queryFn: () => checkScoop() });

  return { isLoading, isScoopInstalled, error };
}

export function useScoopImport() {
  const {
    isLoading,
    data: importStatus,
    error,
  } = useQuery({ queryKey: ["import"], queryFn: () => importScoop() });

  return { isLoading, importStatus, error };
}

export function useScoopExport() {
  const { mutate: exportConfig, error } = useMutation({
    mutationKey: ["export"],
    mutationFn: () => exportScoop(),
    onSuccess(data) {
      const currentDate = new Date().toISOString().split("T")[0];
      const fileName = "scoop_" + currentDate + ".json";
      save({
        defaultPath: BaseDirectory.Download.toString() + "/" + fileName,
        filters: [{ name: "JSON", extensions: ["json"] }],
        title: "Save Scoop config",
      }).then((filePath) => {
        if (filePath) writeTextFile(filePath, JSON.stringify(data));
      });
    },
  });

  return { error, exportConfig };
}

export function useScoopUpdate() {
  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationKey: ["update"],
    mutationFn: (item: string) => updateScoop(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });
  return { update };
}

export function useScoopClean(item: string) {
  useMutation({
    mutationKey: ["clean", item],
    mutationFn: () => updateScoop(item),
  });
}
