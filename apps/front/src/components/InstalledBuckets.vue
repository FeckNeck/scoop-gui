<script setup lang="ts">
import { useIsMutating } from "@tanstack/vue-query";
import { useInstalledBuckets, useUninstallBucket } from "../hooks/buckets";
import AppButton from "./AppButton.vue";
import CustomButton from "./CustomButton.vue";

const { buckets, isLoading, error } = useInstalledBuckets();
const { mutate, isMutating } = useUninstallBucket();

const isMutatingBuckets = useIsMutating({ mutationKey: ["installBucket"] });
</script>

<template>
  <div class="bucket-container">
    <p class="bucket-title">Installed buckets</p>
    <p v-if="isLoading || isMutating || isMutatingBuckets">loading...</p>
    <p v-else-if="error">error</p>
    <div class="buckets" v-else>
      <div class="bucket" v-for="bucket in buckets">
        <span>{{ bucket }}</span>
        <CustomButton
          type="Uninstall"
          :item="bucket"
          @handle-click="mutate(bucket)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bucket-container {
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.5rem;
}

.bucket-title {
  text-align: center;
}

.bucket {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 0.5rem;
  border-bottom: 1px solid lightgray;
}

.bucket:last-child {
  border-bottom: none;
}
</style>
