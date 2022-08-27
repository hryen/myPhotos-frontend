<script setup>
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
import { Dashboard } from "@uppy/vue";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const uppy = new Uppy({ debug: true, autoProceed: false });

const mainStore = useMainStore();
onMounted(() => {
  uppy.use(XHRUpload, {
    endpoint: mainStore.settings.serverAddress + "/api/medias",
  });
});
</script>

<template>
  <div class="upload">
    <Dashboard
      :uppy="uppy"
      :plugins="['DragDrop', 'ProgressBar', 'StatusBar']"
      :props="{ theme: 'light', width: '720px' }"
    />
  </div>
</template>

<style scoped>
.upload {
  padding-top: 16px;
}
</style>
