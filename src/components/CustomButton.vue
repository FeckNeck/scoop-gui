<script setup lang="ts">
import { Icon } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{
  item?: string;
  label: string;
  icon?: Icon;
  size?: number;
}>();

const title = computed(() => props.label + " " + props.item);
</script>

<template>
  <button :aria-label="title" :title="title">
    <span>{{ label }}</span>
    <component :is="icon" :size="size" />
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border: 2px solid var(--border);
  border-radius: 0.25rem;
  gap: 1rem;
}
</style>
