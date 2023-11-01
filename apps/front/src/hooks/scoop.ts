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
  } = useQuery(["status"], () => getScoopStatus(), {
    refetchInterval: 180000, // 3 minutes
  });
  return { isLoading, appsToUpdate, error };
}

export function useScoopCache() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: cache,
    error,
  } = useQuery(["cache"], () => getScoopCache(), {
    refetchInterval: 180000, // 3 minutes
  });

  return { isLoading, cache, error };
}

export function useScoopCheck() {
  const {
    isLoading,
    data: isScoopInstalled,
    error,
  } = useQuery(["check"], () => checkScoop(), {
    enabled: true,
  });

  return { isLoading, isScoopInstalled, error };
}

export function useScoopImport() {
  const {
    isLoading,
    data: importStatus,
    error,
  } = useQuery(["import"], () => importScoop());

  return { isLoading, importStatus, error };
}

export function useScoopExport() {
  const {
    isLoading,
    mutate: exportConfig,
    error,
  } = useMutation(["export"], () => exportScoop(), {
    onSuccess: async (data) => {
      const currentDate = new Date().toISOString().split("T")[0];
      const fileName = "scoop_" + currentDate + ".json";
      const filePath = await save({
        defaultPath: BaseDirectory.Download.toString() + "/" + fileName,
        filters: [{ name: "JSON", extensions: ["json"] }],
        title: "Save Scoop config",
      });

      if (filePath) {
        await writeTextFile(filePath, JSON.stringify(data));
      }
    },
  });

  return { isLoading, error, exportConfig };
}

export function useScoopUpdate() {
  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationKey: ["update"],
    mutationFn: (item: string) => updateScoop(item),
    onSuccess: () => {
      queryClient.invalidateQueries(["status"]);
    },
  });
  return { update };
}

export function useScoopClean(item: string) {
  useMutation(["clean", item], () => updateScoop(item));
}
