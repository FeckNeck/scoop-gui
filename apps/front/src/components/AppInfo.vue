<script setup lang="ts">
import { useAppInfo } from "../hooks/scoop";

const { isLoading, data, error } = useAppInfo("insomnia");
</script>

<template>
  <p v-if="isLoading">loading...</p>
  <p v-else-if="error">error</p>
  <p v-else-if="data">{{ data }}</p>
</template>

<style scoped></style>
