<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronDown, ChevronUp } from "lucide-vue-next";

const showMenu = ref(false);

defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="drop_down-menu">
    <button class="drop_down-btn" @click="showMenu = !showMenu">
      <span>{{ label }}</span>
      <ChevronUp v-if="showMenu" :size="12" />
      <ChevronDown v-else :size="12" />
    </button>
    <div class="drop_down-content" v-if="showMenu">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.drop_down-menu {
  position: relative;
}

.drop_down-btn {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
}

.drop_down-content {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--primary);
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  z-index: 1;
  width: max-content;
  overflow: hidden;
}
</style>
