<script setup>
import { ref } from "vue";
import axios from "axios";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import router from "@/router";

const mainStore = useMainStore();
const { searchInfo, loading, searchMediaListMap } =
  storeToRefs(mainStore);

const visible = ref(false);

const mediaType = ref("");
const make = ref("");
const model = ref("");
const country = ref("");
const province = ref("");
const city = ref("");
const address = ref("");
const district = ref("");
const after = ref("");
const before = ref("");

defineExpose({
  visible,
  address,
  handleReset,
  handleSearch,
});

function handleReset() {
  mediaType.value = "";
  country.value = "";
  province.value = "";
  city.value = "";
  district.value = "";
  address.value = "";
  after.value = "";
  before.value = "";
}

function handleSearch() {
  console.log(
    "mediaType:",
    mediaType.value,
    ", make:",
    make.value,
    ", model:",
    model.value,
    ", country:",
    country.value,
    ", province:",
    province.value,
    ", city:",
    city.value,
    ", district:",
    district.value,
    ", address:",
    address.value,
    ", after:",
    after.value,
    ", before:",
    before.value
  );

  searchInfo.value = "搜索, ";
  if (mediaType.value !== "") {
    searchInfo.value += `mediaType=${mediaType.value}, `;
  }
  if (make.value !== "") {
    searchInfo.value += `make=${make.value}, `;
  }
  if (model.value !== "") {
    searchInfo.value += `model=${model.value}, `;
  }
  if (country.value !== "") {
    searchInfo.value += `country=${country.value}, `;
  }
  if (province.value !== "") {
    searchInfo.value += `province=${province.value}, `;
  }
  if (city.value !== "") {
    searchInfo.value += `city=${city.value}, `;
  }
  if (district.value !== "") {
    searchInfo.value += `district=${district.value}, `;
  }
  if (address.value !== "") {
    searchInfo.value += `address=${address.value}, `;
  }
  if (after.value !== "") {
    searchInfo.value += `after=${after.value}, `;
  }
  if (before.value !== "") {
    searchInfo.value += `before=${before.value}, `;
  }
  searchInfo.value += "结果如下：";

  router.push("/search");
  visible.value = false;
  searchMediaListMap.value = {};
  loading.value = true;
  axios
    .get(mainStore.settings.serverAddress + "/api/medias/search", {
      params: {
        media_type: mediaType.value,
        make: make.value,
        model: model.value,
        country: country.value,
        province: province.value,
        city: city.value,
        district: district.value,
        address: address.value,
        after: after.value,
        before: before.value,
      },
    })
    .then(function (response) {
      response.data.data.forEach((item) => {
        const k = mainStore.dayjs(item.DateTime).format("YYYY年M月D日 dddd");
        if (!searchMediaListMap.value[k]) {
          const list = [];
          list.push(item);
          searchMediaListMap.value[k] = list;
        } else {
          searchMediaListMap.value[k].push(item);
        }
      });
      // console.log(searchMediaListMap.value);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      loading.value = false;
    });
}
</script>

<template>
  <div class="advanced-search" v-show="visible">
    <div class="input-item">
      <label for="mediaType">Type</label>
      <select id="mediaType" v-model="mediaType">
        <option value="">All</option>
        <option value="photo">Photo</option>
        <option value="video">Video</option>
        <option value="LivePhoto">LivePhoto</option>
      </select>
    </div>

    <div class="input-item">
      <label for="make">Make</label>
      <input id="make" type="text" v-model.trim="make" />
    </div>

    <div class="input-item">
      <label for="model">Model</label>
      <input id="model" type="text" v-model.trim="model" />
    </div>

    <div class="input-item">
      <label for="country">Country</label>
      <input id="country" type="text" v-model.trim="country" />
    </div>

    <div class="input-item">
      <label for="province">Province</label>
      <input id="province" type="text" v-model.trim="province" />
    </div>

    <div class="input-item">
      <label for="city">City</label>
      <input id="city" type="text" v-model.trim="city" />
    </div>

    <div class="input-item">
      <label for="district">District</label>
      <input id="district" type="text" v-model.trim="district" />
    </div>

    <div class="input-item">
      <label for="address">Address</label>
      <input id="address" type="text" v-model.trim="address" />
    </div>

    <div class="input-item date">
      <label for="after">Date</label>
      <input id="after" type="date" v-model="after" />
      <span> - </span>
      <input id="before" type="date" v-model="before" />
    </div>
    <div class="control">
      <button type="button" @click="handleReset">Reset</button>
      <button type="button" @click="handleSearch">Search</button>
    </div>
  </div>
</template>

<style scoped>
.advanced-search {
  position: fixed;
  top: 54px;
  left: 256px;
  z-index: 20;

  width: 720px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

  padding: 24px;
  display: flex;
  flex-direction: column;
}

.input-item {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.input-item label {
  width: 100px;
  text-align: left;
  margin-right: 12px;
}

.input-item input,
.input-item select {
  width: calc(100% - 100px);
}

.input-item.date span {
  width: 120px;
  text-align: center;
}
.input-item.date input {
  width: calc(50% - 110px);
}
.control {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
</style>
