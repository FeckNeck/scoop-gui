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
  } = useQuery({
    queryKey: ["installedBuckets"],
    queryFn: getInstalledBuckets,
  });
  return { isLoading, buckets, error };
};

const useAvailableBuckets = () => {
  const {
    isLoading,
    data: buckets,
    error,
  } = useQuery({
    queryKey: ["availableBuckets"],
    queryFn: getAvailableBuckets,
  });
  return { isLoading, buckets, error };
};

const useInstallBucket = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: (bucketName: string) => installBucket(bucketName),
    mutationKey: ["installBucket"],
    onSuccess(bucket) {
      queryClient.invalidateQueries({ queryKey: ["installedBuckets"] });
      queryClient.invalidateQueries({ queryKey: ["apps"] });
      queryClient.setQueryData(["availableBuckets"], (buckets: any) => [
        ...buckets.filter((b: string) => b !== bucket),
      ]);
    },
  });
  return { mutate, isMutating };
};

const useUninstallBucket = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: (bucketName: string) => uninstallBucket(bucketName),
    mutationKey: ["uninstallBucket"],
    onSuccess(bucket) {
      queryClient.invalidateQueries({ queryKey: ["installedBuckets"] });
      queryClient.invalidateQueries({ queryKey: ["apps"] });
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
