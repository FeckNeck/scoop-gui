<script setup lang="ts">
import { useAppInfo } from "../hooks/apps";

const { isFetching, appInfo, error } = useAppInfo();
</script>

<template>
  <div class="app-info">
    <p>App Info</p>
    <p v-if="isFetching">loading...</p>
    <p v-else-if="error">error</p>
    <p v-else-if="appInfo">{{ appInfo }}</p>
    <p v-else>No application selected yet..</p>
  </div>
</template>

<style scoped>
.app-info {
  border-right: 1px solid #ccc;
}
</style>
