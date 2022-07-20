<script setup>
import MediaList from "@/components/MediaList.vue";

import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const { searchInfo, loading, searchMediaListMap } = storeToRefs(mainStore);
</script>

<template>
  <div class="search-result">
    <span class="search-info">{{ searchInfo }}</span>
    <MediaList :loading="loading" :mediaListMap="searchMediaListMap" />
  </div>
</template>

<style scoped>
.search-info {
  line-height: 30px;
}
.search-result {
  height: calc(100% - 30px);
}
</style>
