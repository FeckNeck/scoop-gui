import { API_URL } from "../config";

const getScoopStatus = async (): Promise<string[]> => {
  return await fetch(`${API_URL}/scoop/status`).then((res) => res.json());
};

const getScoopCache = async (): Promise<string> => {
  return await fetch(`${API_URL}/scoop/cache`).then((res) => res.text());
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
    (res) => res.json()
  );
};

const updateScoop = async (item: string): Promise<string> => {
  return await fetch(`${API_URL}/scoop/update/${item}`, {
    method: "POST",
  }).then((res) => res.text());
};

const cleanScoop = async (item: string): Promise<string> => {
  return await fetch(`${API_URL}/scoop/clean/${item}`, {
    method: "POST",
  }).then((res) => res.text());
};

export {
  getScoopStatus,
  getScoopCache,
  checkScoop,
  importScoop,
  exportScoop,
  updateScoop,
  cleanScoop,
};
