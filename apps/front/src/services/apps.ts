import { API_URL } from "../config";
import { AppContent, AppItem, SearchParams } from "../types";

const getApps = async (search: SearchParams): Promise<AppItem[]> => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value) params.append(key, value);
  }
  return await fetch(`${API_URL}/apps?${params}`).then((res) => res.json());
};

const getApp = async (app: string): Promise<AppContent> => {
  return await fetch(`${API_URL}/apps/${app}`).then((res) => res.json());
};

const installApp = async (app: string): Promise<string> => {
  return await fetch(`${API_URL}/apps/${app}`, {
    method: "POST",
  }).then((res) => res.text());
};

const uninstallApp = async (app: string): Promise<string> => {
  return await fetch(`${API_URL}/apps/${app}`, {
    method: "DELETE",
  }).then((res) => res.text());
};
export { getApps, getApp, installApp, uninstallApp };
