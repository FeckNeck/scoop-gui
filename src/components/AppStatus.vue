<script setup lang="ts">
import CustomButton from "./CustomButton.vue";
import { useScoopCache, useScoopUpdate } from "../hooks/scoop";
import { CheckCircle, RefreshCcw } from "lucide-vue-next";

const { update } = useScoopUpdate();
const { isLoading, cache, error } = useScoopCache();
</script>

<template>
  <div class="status-container">
    <p>App status</p>
    <p v-if="isLoading">loading...</p>
    <p v-else-if="error">error</p>
    <p v-else-if="cache">
      <span>Cache: {{ cache }}</span>
    </p>
    <div class="status-btns">
      <CustomButton
        label="Update all"
        @click="update('*')"
        item="(*)"
        :icon="RefreshCcw"
        :size="15"
      />
      <CustomButton
        label="Clean all"
        item="(*)"
        :icon="CheckCircle"
        :size="15"
      />
    </div>
  </div>
</template>

<style scoped>
.status-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}
.status-btns {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
