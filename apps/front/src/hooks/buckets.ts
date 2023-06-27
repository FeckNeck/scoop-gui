import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
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

  const { mutate } = useMutation({
    mutationFn: (bucketName: string) => installBucket(bucketName),
    onSuccess(bucket) {
      queryClient.setQueryData(["installedBuckets"], (buckets: any) => [
        ...buckets,
        bucket,
      ]);
    },
  });
  return { mutate };
};

export { useInstalledBuckets, useAvailableBuckets, useInstallBucket };
