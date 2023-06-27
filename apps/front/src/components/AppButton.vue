<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string;
  type: string;
}>();

defineEmits<{
  handleClick: [bucket: string];
}>();

const ariaLabel = computed(() => {
  return props.type === "install" ? "Install " : "Uninstall " + props.label;
});
</script>

<template>
  <button
    @click="$emit('handleClick', props.label)"
    :aria-label="ariaLabel"
    class="app-button"
  >
    <p>{{ label }}</p>
    <p v-if="type == 'install'">-</p>
    <p v-else>+</p>
  </button>
</template>

<style scoped>
.app-button {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
