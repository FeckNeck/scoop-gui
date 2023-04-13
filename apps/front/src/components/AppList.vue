<script setup lang="ts">
import { ref } from "vue";

const list = ref(["app1", "app2", "app3"]);
</script>

<template>
  <div>
    <p>App List</p>
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
