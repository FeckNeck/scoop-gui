<script setup lang="ts">
import { AppItem } from "../types";
import CustomButton from "./CustomButton.vue";
import { selectedApp } from "../hooks/apps";

defineProps<{
  app: AppItem;
}>();
</script>

<template>
  <button class="app-item" @click="selectedApp = app.name">
    <span>{{ app.name }}</span>
    <span> {{ app.path }}</span>
    <CustomButton type="Install" :item="app.name" />
  </button>
</template>

<style scoped>
.app-item {
  /* display: grid;
  grid-template-columns: repeat(3, 1fr); */
  display: flex;
  align-items: center;
  height: 40px;
}
</style>
