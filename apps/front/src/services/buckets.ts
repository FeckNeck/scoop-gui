import { API_URL } from "../config";

const getInstalledBuckets = async (): Promise<string[]> => {
  return await fetch(`${API_URL}/buckets/installed`).then((res) => res.json());
};

const getAvailableBuckets = async (): Promise<string[]> => {
  return await fetch(`${API_URL}/buckets/available`).then((res) => res.json());
};

const installBucket = async (bucketName: string): Promise<string> => {
  const bucket = await fetch(`${API_URL}/buckets/${bucketName}`, {
    method: "POST",
  }).then((res) => res.text());
  return bucket;
};

const uninstallBucket = async (bucketName: string): Promise<string> => {
  const bucket = await fetch(`${API_URL}/buckets/${bucketName}`, {
    method: "POST",
  }).then((res) => res.json());
  return bucket;
};

export {
  getInstalledBuckets,
  getAvailableBuckets,
  installBucket,
  uninstallBucket,
};
