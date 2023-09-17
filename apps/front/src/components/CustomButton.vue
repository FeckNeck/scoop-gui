<script setup lang="ts">
const props = defineProps<{
  item: string;
  type: "Install" | "Uninstall" | "Update";
}>();

defineEmits<{
  handleClick: [item: string];
}>();
</script>

<template>
  <button @click="$emit('handleClick', props.item)">
    <span>{{ type }}</span>
    <img
      v-if="type === 'Install'"
      src="../assets/icons/install.svg"
      alt="install"
      class="install"
    />
    <img
      v-else
      src="../assets/icons/uninstall.svg"
      alt="uninstall"
      class="uninstall"
    />
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  gap: 1rem;
}

.install {
  rotate: 90deg;
}

.uninstall {
  rotate: 270deg;
}
</style>
