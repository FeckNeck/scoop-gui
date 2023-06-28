<script setup lang="ts">
import { useAppInfo } from "../hooks/apps";

// const { isLoading, info, error } = useAppInfo("insomnia");
</script>

<template>
  <!-- <p v-if="isLoading">loading...</p>
  <p v-else-if="error">error</p>
  <p v-else-if="info">{{ info }}</p> -->
  <div class="app-info">
    <p>App Info</p>
  </div>
</template>

<style scoped>
.app-info {
  border-right: 1px solid #ccc;
}
</style>
