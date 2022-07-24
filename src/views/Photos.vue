<script setup>
import MediaList from "@/components/MediaList.vue";

import { ref, onMounted } from "vue";
import axios from "axios";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();

const page = ref(1);
const pageSize = ref(30);
const loading = ref(false);
const mediaListMap = ref({});

function listMedia() {
  loading.value = true;
  axios
    .get(mainStore.settings.serverAddress + "/api/medias", {
      params: {
        page: page.value,
        page_size: pageSize.value,
      },
    })
    .then(function (response) {
      response.data.data.forEach((item) => {
        const k = mainStore.dayjs(item.DateTime).format("YYYY年M月D日 dddd");
        if (!mediaListMap.value[k]) {
          const list = [];
          list.push(item);
          mediaListMap.value[k] = list;
        } else {
          mediaListMap.value[k].push(item);
        }
      });
      //   console.log(mediaListMap.value);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      loading.value = false;
    });
}

function loadMore() {
  page.value++;
  listMedia();
}

onMounted(() => {
  listMedia();
});
</script>

<template>
  <MediaList :loading="loading" :mediaListMap="mediaListMap" @loadMore="loadMore" />
</template>
