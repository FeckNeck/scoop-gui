<script setup lang="ts">
import { useAvailableBuckets } from "../hooks/buckets";
import AppButton from "./AppButton.vue";

const { buckets, error, isLoading } = useAvailableBuckets();

const installBuket = () => {
  console.log("Create bucket");
};
</script>

<template>
  <div>
    <p>Available buckets</p>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="bucket in buckets" :key="bucket">
          {{ bucket }}
        </li>
      </ul>
    </div>
    <AppButton label="Create bucket" type="add" @handleClick="installBuket" />
  </div>
</template>

<style scoped></style>
