<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sun } from "lucide-vue-next";
import { computed } from "vue";

const isDark = useDark({
  selector: "html",
  attribute: "data-color-mode",
  valueLight: "light",
  valueDark: "dark",
  initialValue: "auto",
  disableTransition: false,
});
const toggleDark = useToggle(isDark);

const theme = computed(() => (isDark.value ? "dark" : "light"));

const title = computed(() => "Activate " + theme.value + " theme");
</script>

<template>
  <button @click="toggleDark()" :aria-label="title" :title="title">
    <Sun v-if="!isDark" :size="20"></Sun>
    <Moon v-else :size="20"></Moon>
  </button>
</template>

<style scoped>
.theme {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
</style>
