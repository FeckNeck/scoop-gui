<script setup lang="ts">
import { selectedApp } from "../hooks/apps";
</script>

<template>
  <div class="apps-container">
    <!-- <p v-if="isLoading">loading...</p>
    <p v-else-if="error">error</p>
    <ul v-else class="app-list">
      <li v-for="(app, index) in installedApps" :key="index">
        {{ app }}
      </li>
    </ul> -->
    <button @click="selectedApp = 'insomnia'">insomnia</button>
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
