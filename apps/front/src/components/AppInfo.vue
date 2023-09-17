<script setup lang="ts">
import { computed } from "vue";
import { useAppInfo } from "../hooks/apps";

const { isFetching, appInfo, error } = useAppInfo();

// const name = computed(() => {
//   return appInfo?.value?.bin[1] || appInfo?.value?.shortcuts[1] || "";
// });
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
        ><span>{{ appInfo.homepage }}</span>
        <img src="../assets/icons/external-link.svg" alt="external link"
      /></a>
    </div>
    <p v-else>No application selected yet..</p>
  </div>
</template>

<style scoped>
.app-info {
  border-right: 1px solid #ccc;
}

.link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    color: var(--teal);
    text-decoration: underline;
  }
}
</style>
