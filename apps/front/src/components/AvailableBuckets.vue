<script setup lang="ts">
import { useAvailableBuckets, useInstallBucket } from "../hooks/buckets";
import AppButton from "./AppButton.vue";

const { buckets, error, isLoading } = useAvailableBuckets();
const { mutate } = useInstallBucket();

const installBuket = (bucket: string) => {
  mutate(bucket);
};
</script>

<template>
  <div>
    <p>Available buckets</p>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="bucket in buckets" :key="bucket">
          <AppButton :label="bucket" type="add" @handleClick="installBuket" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
