import { API_URL } from "../config";
import { ScoopStatus } from "../types";

const getScoopStatus = async (): Promise<ScoopStatus> => {
  return await fetch(`${API_URL}/scoop/status`).then((res) => res.json());
};

export { getScoopStatus };
