<script setup>
import Photos from "@/views/Photos.vue";
import Favorites from "@/views/Favorites.vue";
import Search from "@/views/Search.vue";

import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const { currentMenu } = storeToRefs(mainStore);
</script>

<template>
  <main>
    <Photos v-if="currentMenu === 'photos'" />
    <Favorites v-if="currentMenu === 'favorites'" />
    <Search v-if="currentMenu === 'search'" />
  </main>
</template>

<style scoped>
main {
  position: absolute;
  top: 64px;
  left: 0;

  width: 100%;
  height: calc(100% - 64px);

  padding-left: 256px;
}
</style>
