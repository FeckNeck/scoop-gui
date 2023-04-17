import { API_URL } from "../config";
import { AppInfo, ScoopStatus } from "../types";

const getAppInfo = async (app: string): Promise<AppInfo> => {
  return await fetch(`${API_URL}/scoop/${app}`).then((res) => res.json());
};

const getScoopStatus = async (): Promise<ScoopStatus> => {
  return await fetch(`${API_URL}/scoop/status`).then((res) => res.json());
};

export default getAppInfo;
