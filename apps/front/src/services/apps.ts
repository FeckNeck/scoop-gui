import { API_URL } from "../config";
import { AppContent, AppInfo, AppItem } from "../types";

const getApps = async (): Promise<AppItem[]> => {
  return await fetch(`${API_URL}/apps`).then((res) => res.json());
};

const getApp = async (app: string): Promise<AppContent> => {
  return await fetch(`${API_URL}/apps/${app}`).then((res) => res.json());
};

export { getApps, getApp };
