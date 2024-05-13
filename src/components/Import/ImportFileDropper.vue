<script setup lang="ts">
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/api/dialog";
import { computed, ref } from "vue";
import CustomButton from "../CustomButton.vue";
import { File, Upload } from "lucide-vue-next";

listen("tauri://file-drop", (event) => {
  console.log("event:", event);
});

listen("tauri://file-drop-hover", (e) => console.log(e));

const isDraggedOver = ref(false);
const selectedFile = ref<string | null>(null);

const fileName = computed(() => {
  return selectedFile.value?.split("\\").pop();
});

const openFileDialog = async () => {
  const result = await open({
    filters: [
      {
        name: "json",
        extensions: ["json"],
      },
    ],
  });
  if (typeof result === "string") {
    selectedFile.value = result;
  }
};
</script>

<template>
  <button
    class="dropper"
    ref="dropper"
    :class="{ 'dragged-over': isDraggedOver }"
    @click="openFileDialog()"
  >
    <template v-if="selectedFile">
      <File :size="20" />
      <span>{{ fileName }}</span>
    </template>
    <template v-else>
      <Upload :size="20" />
      <span
        >Drag and Drop or <span class="choose-file">Choose a File</span> to
        import</span
      >
    </template>
  </button>
  <!-- <div >
    <CustomButton label="Import" icon="file-plus" v-if="fileName"/>
  </div> -->
</template>

<style scoped>
.dropper {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--secondary);
  border: 1px solid var(--border);
  border-radius: 0.25rem;
}

.dragged-over {
  border-color: var(--teal);
}

.choose-file {
  color: var(--teal);
}
</style>
