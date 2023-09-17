import { API_URL } from "../config";
import { ScoopStatus } from "../types";

const getScoopStatus = async (): Promise<ScoopStatus> => {
  return await fetch(`${API_URL}/scoop/status`).then((res) => res.json());
};

const checkScoop = async (): Promise<boolean> => {
  return await fetch(`${API_URL}/scoop/check`).then((res) => res.json());
};

const importScoop = async (): Promise<File> => {
  return await fetch(`${API_URL}/scoop/import`, { method: "POST" }).then(
    (res) => res.json()
  );
};

const exportScoop = async (): Promise<any> => {
  return await fetch(`${API_URL}/scoop/export`, { method: "POST" }).then(
    (res) => {
      console.log(res);
      return res.blob();
    }
  );
};

export { getScoopStatus, checkScoop, importScoop, exportScoop };
