<script setup lang="ts">
import { useAvailableBuckets, useInstallBucket } from "../hooks/buckets";
import CustomButton from "./CustomButton.vue";
import { Download } from "lucide-vue-next";

const { buckets, error, isLoading } = useAvailableBuckets();
const { mutate, isMutating } = useInstallBucket();
</script>

<template>
  <div class="bucket-container">
    <p class="bucket-title">Available buckets</p>
    <p v-if="isLoading || isMutating">loading...</p>
    <p v-else-if="error">error</p>
    <div class="buckets" v-else>
      <div class="bucket" v-for="bucket in buckets">
        <span>{{ bucket }}</span>
        <CustomButton
          label="Install"
          :item="bucket"
          :icon="Download"
          :size="15"
          @click="mutate(bucket)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bucket-container {
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
