<script setup lang="ts">
import { useInstalledBuckets } from "../hooks/buckets";

const { buckets, isLoading, error } = useInstalledBuckets();
</script>

<template>
  <div>
    <p>Installed buckets</p>
    <p v-if="isLoading">loading...</p>
    <p v-else-if="error">error</p>
    <ul v-else>
      <li v-for="bucket in buckets" :key="bucket">
        <p>{{ bucket }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
