<script setup lang="ts">
import { useApps } from "../hooks/apps";

const { isLoading, apps, error } = useApps();
</script>

<template>
  <div class="apps-container">
    <p v-if="isLoading">loading...</p>
    <p v-else-if="error">error</p>
    <ul v-else-if="apps" class="app-list">
      <li v-for="app in apps" :key="app.url">
        <p v-if="app.homepage === 'https://insomnia.rest'">{{ app }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.apps-container {
  overflow-y: auto;
}

.app-list {
  height: 100%;
}
</style>
