<script setup lang="ts">
import { useIsMutating } from "@tanstack/vue-query";
import { useInstalledBuckets, useUninstallBucket } from "../hooks/buckets";
import AppButton from "./AppButton.vue";

const { buckets, isLoading, error } = useInstalledBuckets();
const { mutate, isMutating } = useUninstallBucket();

const isMutatingBuckets = useIsMutating({ mutationKey: ["installBucket"] });
</script>

<template>
  <div class="installed-buckets">
    <p>Installed buckets</p>
    <p v-if="isLoading || isMutating || isMutatingBuckets">loading...</p>
    <p v-else-if="error">error</p>
    <div v-else>
      <AppButton
        v-for="bucket in buckets"
        :key="bucket"
        :label="bucket"
        type="uninstall"
        @handle-click="mutate(bucket)"
      />
    </div>
  </div>
</template>

<style scoped>
.installed-buckets {
  border-bottom: 1px solid #ccc;
}
</style>
