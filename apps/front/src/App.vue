<script setup lang="ts">
import BucketList from "./components/BucketList.vue";
import AppContainer from "./components/AppContainer.vue";
import AppInfo from "./components/AppInfo.vue";
import AppStatus from "./components/AppStatus.vue";
</script>

<template>
  <div class="container">
    <aside>
      <BucketList />
      <BucketList />
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
  grid-template-columns: 25rem 1fr;
  height: 100%;
  grid-template-rows: 1fr 20rem;
  gap: 0.5rem;
}

aside {
  display: grid;
  grid-area: aside;
  grid-template-rows: repeat(2, 1fr);
}

main {
  grid-area: main;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

footer {
  display: grid;
  grid-area: footer;
  grid-template-columns: repeat(2, 1fr);
}
</style>
