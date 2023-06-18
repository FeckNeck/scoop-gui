import { API_URL } from "../config";

const getInstalledBuckets = async (): Promise<string[]> => {
  return await fetch(`${API_URL}/buckets/installed`).then((res) => res.json());
};

const getAvailableBuckets = async (): Promise<string[]> => {
  return await fetch(`${API_URL}/buckets/available`).then((res) => res.json());
};

export { getInstalledBuckets, getAvailableBuckets };
