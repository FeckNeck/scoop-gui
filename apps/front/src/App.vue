<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import AppContainer from "./components/AppContainer.vue";
import AppInfo from "./components/AppInfo.vue";
import AppStatus from "./components/AppStatus.vue";
import AvailableBuckets from "./components/AvailableBuckets.vue";
import InstalledBuckets from "./components/InstalledBuckets.vue";
import ScoopModal from "./components/ScoopModal.vue";
import { useScoopCheck } from "./hooks/scoop";
import { watch } from "vue";

const { isLoading, isScoopInstalled } = useScoopCheck();
</script>

<template>
  <!-- <ScoopModal /> -->
  <div class="container">
    <aside>
      <InstalledBuckets />
      <AvailableBuckets />
    </aside>
    <main>
      <AppContainer />
    </main>
    <footer>
      <AppInfo />
      <AppStatus />
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-areas:
    "aside main  "
    "aside footer";
  grid-template-columns: 20rem 1fr;
  height: 100%;
  grid-template-rows: 1fr 15rem;
}

aside {
  display: grid;
  grid-area: aside;
  grid-template-rows: repeat(2, 1fr);
  border-right: 1px solid #ccc;
}

main {
  grid-area: main;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
}

footer {
  display: grid;
  grid-area: footer;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
</style>
