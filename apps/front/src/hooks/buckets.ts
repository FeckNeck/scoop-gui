import { useQuery } from "@tanstack/vue-query";
import { getAvailableBuckets, getInstalledBuckets } from "../services/buckets";

const useInstalledBuckets = () => {
  const {
    isLoading,
    data: buckets,
    error,
  } = useQuery(["installedBuckets"], () => getInstalledBuckets());
  return { isLoading, buckets, error };
};

const useAvailableBuckets = () => {
  const {
    isLoading,
    data: buckets,
    error,
  } = useQuery(["availableBuckets"], () => getAvailableBuckets());
  return { isLoading, buckets, error };
};

export { useInstalledBuckets, useAvailableBuckets };
