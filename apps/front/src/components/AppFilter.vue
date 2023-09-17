<script setup lang="ts">
import CustomButton from "./CustomButton.vue";
import { useAvailableBuckets, useInstalledBuckets } from "../hooks/buckets";
import { computed, ref } from "vue";
import SettingsModal from "./SettingsModal.vue";
import { useScoopExport } from "../hooks/scoop";

const { buckets: availableBuckets } = useAvailableBuckets();
const { buckets: installedBuckets } = useInstalledBuckets();

const showSettings = ref(false);

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

useScoopExport();
</script>

<template>
  <!-- <v-text-field label="" variant="outlined" dense></v-text-field> -->
  <div class="filter-container">
    <div class="filters">
      <input type="search" placeholder="Search" class="search" />
      <select name="status" id="status" class="status">
        <option value="all" selected>All</option>
        <option value="installed">Installed</option>
        <option value="available">Available</option>
      </select>
      <select name="buckets" id="buckets" class="buckets">
        <option value="all" selected>All</option>
        <!-- <option v-for="bucket of buckets" :value="bucket">{{ bucket }}</option> -->
      </select>
    </div>
    <button class="settings" @click="toggleSettings">
      <span>Settings</span>
    </button>
  </div>
  <SettingsModal v-if="showSettings" @toggleSettings="toggleSettings" />
</template>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  justify-content: space-space-between;
  padding: 1rem;
}

.filters {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  flex-grow: 1;
}

.search {
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  padding-block: 0.25rem;
}

select {
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  padding-block: 0.25rem;
  font-family: inherit;
}

option {
  font-family: "Nunito";
}
</style>
