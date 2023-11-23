<script setup lang="ts">
import { computed } from "vue";
import { useApps, useInstallApp, useUninstallApp } from "../hooks/apps";
import { useScoopStatus, useScoopUpdate } from "../hooks/scoop";
import { useVirtualList } from "@vueuse/core";
import AppItem from "./AppItem.vue";
import { currentApp } from "../hooks/apps";

const { appsToUpdate } = useScoopStatus();
const { update } = useScoopUpdate();
const { apps, error, isFetching } = useApps();
const { install } = useInstallApp();
const { uninstall } = useUninstallApp();

const loadedApps = computed(() => {
  return apps.value ?? [];
});

const { list, containerProps, wrapperProps } = useVirtualList(loadedApps, {
  itemHeight: 70,
});

const manageApp = (app: any) => {
  app.state === "installed" ? uninstall(app.name) : install(app.name);
};
</script>

<template>
  <div class="apps-container">
    <p v-if="isFetching">loading...</p>
    <p v-else-if="error">error</p>
    <p v-else-if="apps?.length === 0">No app found</p>
    <div v-else-if="apps">
      <div v-bind="containerProps" class="app-list">
        <div v-bind="wrapperProps">
          <AppItem
            v-for="app in list"
            :key="app.index"
            :app="app.data"
            :updatable="appsToUpdate?.includes(app.data.name)"
            @manageApp="manageApp"
            @updateApp="(appName: string) => update(appName)"
            @displayAppInfos="(appName: string) => (currentApp = appName)"
            class="app"
          >
          </AppItem>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-list {
  height: calc(100vh - 15rem - 70px);
  overflow-y: auto;
  padding-inline: 2rem;
}

.app {
  height: 70px;
  border-bottom: 1px solid var(--border);
}

.app:last-child {
  border-bottom: none;
}
</style>
