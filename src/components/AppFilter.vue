<script setup lang="ts">
import { useInstalledBuckets } from "../hooks/buckets";
import { useScoopExport } from "../hooks/scoop";
import { ref } from "vue";
import ThemeButton from "./ThemeButton.vue";
import { watchDebounced } from "@vueuse/core";
import { params } from "../hooks/apps";
import CustomMenu from "./CustomMenu.vue";
import { FileInput, FileOutput } from "lucide-vue-next";
import ImportModal from "./ImportModal.vue";

const { buckets: installedBuckets } = useInstalledBuckets();
const { exportConfig } = useScoopExport();

const inputSearch = ref("");
const showSettings = ref(false);

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

watchDebounced(
  inputSearch,
  (value) => {
    params.appName = value;
  },
  { debounce: 500 }
);
</script>

<template>
  <div class="filter-container">
    <div class="filters">
      <input
        type="search"
        placeholder="Search"
        class="search"
        v-model="inputSearch"
      />
      <select v-model="params.state" name="status" id="status" class="status">
        <option value="">All</option>
        <option value="installed">Installed</option>
        <option value="available">Available</option>
      </select>
      <select
        v-model="params.bucket"
        name="buckets"
        id="buckets"
        class="buckets"
      >
        <option value="">All</option>
        <option v-for="bucket of installedBuckets" :value="bucket">
          {{ bucket }}
        </option>
      </select>
    </div>
    <CustomMenu label="config">
      <button class="menu-btn">
        <FileInput :size="15" />
        <span>Import</span>
      </button>
      <button class="menu-btn" @click="exportConfig()">
        <FileOutput :size="15" />
        <span>Export</span>
      </button>
    </CustomMenu>
    <ThemeButton />
    <ImportModal />
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  justify-content: space-space-between;
  padding: 1rem;
  height: 70px;
}

.filters {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  flex-grow: 1;
}

.search {
  border: 2px solid var(--border);
  outline: none;
  border-radius: 0.25rem;
  padding: 0.25rem;
}

.search:focus {
  border-color: var(--teal);
}

select {
  border: 2px solid var(--border);
  border-radius: 0.25rem;
  padding-block: 0.25rem;
  font-family: inherit;
  outline: none;
}

select:focus,
select:after {
  border-color: var(--teal) !important;
}

option {
  font-family: "Nunito";
}

.menu-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: inherit;
  padding: 0.5rem;
}

.menu-btn:hover {
  filter: brightness(0.9);
}
</style>
