<script setup lang="ts">
import { computed } from "vue";
import { useAppInfo } from "../hooks/apps";
import { ExternalLink } from "lucide-vue-next";

const { isFetching, appInfo, error } = useAppInfo();
</script>

<template>
  <div class="app-info">
    <p>App Info</p>
    <p v-if="isFetching">loading...</p>
    <p v-else-if="error">error</p>
    <div v-else-if="appInfo">
      <p>Name: {{ appInfo.bin }}</p>
      <p>Description: {{ appInfo.description }}</p>
      <p>Version: {{ appInfo.version }}</p>
      <a :href="appInfo.homepage" class="link" target="”_blank”"
        ><span class="text">{{ appInfo.homepage }}</span>
        <ExternalLink :size="15" />
      </a>
    </div>
    <p v-else>No application selected yet..</p>
  </div>
</template>

<style scoped>
.app-info {
  border-right: 1px solid #ccc;
  padding: 0.5rem;
}

.link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .text {
    color: var(--teal);
    text-decoration: underline;
  }
}
</style>
