<script setup lang="ts">
import { selectedApp, useApps } from "../hooks/apps";
import AppItem from "./AppItem.vue";

const { apps, isLoading, error } = useApps();
</script>

<template>
  <div class="apps-container">
    <p v-if="isLoading">loading...</p>
    <p v-else-if="error">error</p>
    <!-- <div v-else class="app-list">
      <AppItem v-for="app in apps" :app="app">
        {{ app }}
      </AppItem>
    </div> -->
    <RecycleScroller
      v-else
      class="app-list"
      :items="apps"
      :item-size="40"
      key-field="name"
      v-slot="{ item }"
    >
      <AppItem :app="item" />
    </RecycleScroller>
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
