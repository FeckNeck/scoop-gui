<script setup lang="ts">
import { useScoopStatus } from "../hooks/scoop";

const { isLoading, status, error } = useScoopStatus();
</script>

<template>
  <p v-if="isLoading">loading..</p>
  <p v-else-if="error">error</p>
  <p v-else-if="status">
    {{ status }}
  </p>
</template>

<style scoped></style>
