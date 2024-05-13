<script setup lang="ts">
import { ref } from "vue";
import { X, File, FileInput, Link } from "lucide-vue-next";
import ImportFileDropper from "./Import/ImportFileDropper.vue";
import CustomButton from "./CustomButton.vue";

const emit = defineEmits<{
  (e: "toggleSettings"): void;
}>();

const importChoice = ref("File");
const importTypes = [
  {
    name: "File",
    icon: File,
  },
  {
    name: "Url",
    icon: Link,
  },
];
const file = ref<string | null>(null);
const dialog = ref<HTMLElement | null>(null);

window.addEventListener("mousedown", (e) => {
  if ((e.target as Element).closest(".modal-content")) return;
  emit("toggleSettings");
});
</script>

<template>
  <dialog class="modal" ref="dialog">
    <div class="modal-content">
      <div class="modal-header">
        <span>Import Scoop Config </span>
        <button @click="emit('toggleSettings')" class="close">
          <X />
        </button>
      </div>
      <div class="modal-body">
        <div class="file-menu">
          <button
            v-for="importType in importTypes"
            :class="{ active: importType.name === importChoice }"
            @click="importChoice = importType.name"
            class="file-type"
          >
            <component :is="importType.icon" :size="15" />
            <span>{{ importType.name }}</span>
          </button>
        </div>
        <input
          v-if="importChoice === 'Url'"
          class="url-import"
          type="text"
          name="url-import"
          id="url-import"
          placeholder="https://website.com/scoop-config.json"
          v-model="file"
        />
        <ImportFileDropper v-else />
        <div v-if="file">
          <CustomButton
            label="Scan"
            class="scan-file-btn"
            :item="file"
            :icon="FileInput"
            :size="15"
          />
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  width: 28rem;
  background-color: var(--primary);
  color: var(--text);
  border-radius: 0.5rem;
  padding: 1rem;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.close {
  color: var(--text);
}

.file-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  background-color: var(--secondary);
  border-radius: 0.25rem;
  border: 1px solid var(--border);
}

.file-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: inherit;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.active {
  filter: brightness(0.9);
}

.url-import {
  padding: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border);
  background-color: var(--secondary);
  color: var(--text);
  outline: none;
}

.scan-file-btn {
  float: right;
}
</style>
