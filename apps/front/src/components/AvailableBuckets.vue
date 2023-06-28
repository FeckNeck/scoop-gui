<script setup lang="ts">
import { useIsMutating } from "@tanstack/vue-query";
import { useAvailableBuckets, useInstallBucket } from "../hooks/buckets";
import AppButton from "./AppButton.vue";

const { buckets, error, isLoading } = useAvailableBuckets();
const { mutate, isMutating } = useInstallBucket();

const isMutatingBuckets = useIsMutating({ mutationKey: ["uninstallBucket"] });
</script>

<template>
  <div>
    <p>Available buckets</p>
    <div v-if="isLoading || isMutating || isMutatingBuckets">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="bucket in buckets" :key="bucket">
          <AppButton
            :label="bucket"
            type="install"
            @handleClick="mutate(bucket)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
