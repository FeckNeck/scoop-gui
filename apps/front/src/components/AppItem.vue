<script setup lang="ts">
import { AppItem } from "../types";
import CustomButton from "./CustomButton.vue";
import { computed } from "vue";
import { Upload, Download, RefreshCcw } from "lucide-vue-next";

const props = defineProps<{
  app: AppItem;
  updatable?: boolean;
}>();

const emit = defineEmits<{
  (e: "manageApp", app: AppItem): void;
  (e: "updateApp", appName: string): void;
  (e: "displayAppInfos", appName: string): void;
}>();

const statusLabel = computed(() => {
  return props.app.state === "installed" ? "Uninstall" : "Install";
});

const icon = computed(() => {
  return props.app.state === "installed" ? Upload : Download;
});
</script>

<template>
  <div class="app-item" @click="emit('displayAppInfos', app.name)">
    <div class="infos">
      <span class="title">{{ app.name }}</span>
      <span> {{ app.path }}</span>
    </div>
    <div class="btns">
      <CustomButton
        v-if="updatable"
        label="Update"
        :item="app.name"
        :icon="RefreshCcw"
        :size="15"
        @click="emit('updateApp', app.name)"
      />
      <CustomButton
        :label="statusLabel"
        :item="app.name"
        :icon="icon"
        :size="15"
        @click="emit('manageApp', app)"
      />
    </div>
  </div>
</template>

<style scoped>
.app-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  cursor: pointer;
  .infos {
    display: flex;
    gap: 1rem;
    flex-grow: 1;

    .title {
      font-weight: bold;
    }
  }
}

.btns {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
