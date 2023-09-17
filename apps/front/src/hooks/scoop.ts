import { useQuery } from "@tanstack/vue-query";
import {
  checkScoop,
  exportScoop,
  getScoopStatus,
  importScoop,
} from "../services/scoop";
import { saveAs } from "file-saver";

export function useScoopStatus() {
  const {
    isLoading,
    data: status,
    error,
  } = useQuery(["status"], () => getScoopStatus());
  return { isLoading, status, error };
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
  } = useQuery(["import"], () => importScoop(), {
    enabled: true,
  });

  return { isLoading, importStatus, error };
}

export function useScoopExport() {
  const {
    isLoading,
    data: exportStatus,
    error,
  } = useQuery(["export"], () => exportScoop(), {
    enabled: true,
    onSuccess: (data) => {
      saveAs(data, "scoop.json");
    },
  });

  return { isLoading, exportStatus, error };
}
