import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import {
  getAvailableBuckets,
  getInstalledBuckets,
  installBucket,
  uninstallBucket,
} from "../services/buckets";

const useInstalledBuckets = () => {
  const {
    isLoading,
    data: buckets,
    error,
  } = useQuery(["installedBuckets"], getInstalledBuckets);
  return { isLoading, buckets, error };
};

const useAvailableBuckets = () => {
  const {
    isLoading,
    data: buckets,
    error,
  } = useQuery(["availableBuckets"], getAvailableBuckets);
  return { isLoading, buckets, error };
};

const useInstallBucket = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: (bucketName: string) => installBucket(bucketName),
    mutationKey: ["installBucket"],
    onSuccess(bucket) {
      queryClient.invalidateQueries(["installedBuckets"]);
      queryClient.invalidateQueries(["apps"]);
      queryClient.setQueryData(["availableBuckets"], (buckets: any) => [
        ...buckets.filter((b: string) => b !== bucket),
      ]);
    },
  });
  return { mutate, isMutating };
};

const useUninstallBucket = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: (bucketName: string) => uninstallBucket(bucketName),
    mutationKey: ["uninstallBucket"],
    onSuccess(bucket) {
      queryClient.invalidateQueries(["installedBuckets"]);
      queryClient.invalidateQueries(["apps"]);
      queryClient.setQueryData(["availableBuckets"], (buckets: any) => [
        ...buckets,
        bucket,
      ]);
    },
  });
  return { mutate, isMutating };
};

export {
  useInstalledBuckets,
  useAvailableBuckets,
  useInstallBucket,
  useUninstallBucket,
};
