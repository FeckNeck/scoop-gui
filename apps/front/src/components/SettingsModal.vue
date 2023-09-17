<script setup lang="ts">
import { ref } from "vue";

defineEmits<{
  toggleSettings: () => void;
}>();

const currentSetting = ref("Data");
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span>title</span>
        <span>x</span>
      </div>
      <div class="modal-body">
        <nav>
          <ul>
            <li>Data</li>
            <li>Theme</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
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
  background-color: white;
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
}

nav {
  border-bottom: 1px solid lightgray;

  ul {
    display: flex;
    align-items: center;

    li {
      padding: 0.5rem 1rem;
      border-inline: 1px solid lightgray;
    }
  }
}
</style>
