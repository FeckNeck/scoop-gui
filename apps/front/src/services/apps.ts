import { API_URL } from "../config";
import { AppContent, AppInfo } from "../types";

const getApps = async (): Promise<AppContent[]> => {
  return await fetch(`${API_URL}/apps/`).then((res) => res.json());
};

const getApp = async (app: string): Promise<AppInfo> => {
  return await fetch(`${API_URL}/scoop/${app}`).then((res) => res.json());
};

export { getApps, getApp };
