<script setup lang="ts">
import { useInstalledBuckets, useUninstallBucket } from "../hooks/buckets";
import CustomButton from "./CustomButton.vue";
import { Upload } from "lucide-vue-next";

const { buckets, isLoading, error } = useInstalledBuckets();
const { mutate, isMutating } = useUninstallBucket();
</script>

<template>
  <div class="bucket-container">
    <p class="bucket-title">Installed buckets</p>
    <p v-if="isLoading || isMutating">loading...</p>
    <p v-else-if="error">error</p>
    <div class="buckets" v-else>
      <div class="bucket" v-for="bucket in buckets">
        <span>{{ bucket }}</span>
        <CustomButton
          label="Uninstall"
          :item="bucket"
          @click="mutate(bucket)"
          :icon="Upload"
          :size="15"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bucket-container {
  border-bottom: 1px solid lightgrey;
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
  border-bottom: 1px solid var(--border);
}

.bucket:last-child {
  border-bottom: none;
}
</style>
