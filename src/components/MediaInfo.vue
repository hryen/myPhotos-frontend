<script setup>
import { ref } from "vue";
import axios from "axios";
import { useMainStore } from "@/stores/main";
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";

const mainStore = useMainStore();

const props = defineProps(["infoVisible"]);

const mediaInfo = ref(null);

const map = shallowRef(null);
const mapVisible = ref(false);

defineExpose({
  getMediaInfo,
});

function getMediaInfo(id) {
  axios
    .get(mainStore.settings.serverAddress + "/api/medias/" + id + "/info")
    .then(function (response) {
      mediaInfo.value = response.data.data;
      showMap();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// media geo map
function initMap(lon, lat) {
  AMapLoader.load({
    key: mainStore.settings.AMapKey,
    version: "2.0",
    plugins: ["AMap.ToolBar"],
  })
    .then((AMap) => {
      map.value = new AMap.Map("map-container", {
        viewMode: "2D",
        zoom: 13,
        center: [lon, lat],
      });

      map.value.add(
        new AMap.Marker({
          position: new AMap.LngLat(lon, lat),
        })
      );

      var toolbar = new AMap.ToolBar();
      map.value.addControl(toolbar);
    })
    .catch((e) => {
      console.log(e);
    });
}
function showMap() {
  mapVisible.value = false;

  const media = mediaInfo.value;
  if (
    !props.infoVisible ||
    !media ||
    !media.GPSLongitude ||
    !media.GPSLatitude ||
    media.GPSLongitude === "" ||
    media.GPSLatitude === ""
  ) {
    return;
  }

  const lon = parseFloat(media.GPSLongitude);
  const lat = parseFloat(media.GPSLatitude);

  if (map.value) {
    map.value.clearMap();
    const position = new AMap.LngLat(lon, lat);
    map.value.setCenter(position);
    map.value.add(
      new AMap.Marker({
        position: position,
      })
    );
    map.value.setZoom(13);
  } else {
    initMap(lon, lat);
  }
  mapVisible.value = true;
}
</script>

<template>
  <div v-show="props.infoVisible" class="info_dialog">
    <div class="title">
      <span>信息</span>
      <span style="height: 48px; width: 48px; padding: 12px">
        <!-- https://photos.google.com icon -->
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="cursor: pointer"
          @click="$emit('close')"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
          ></path></svg
      ></span>
    </div>
    <div class="detail">详情</div>
    <template v-if="mediaInfo">
      <div class="info-item">
        <dt>
          <!-- https://photos.google.com icon -->
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 9.5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5z"
            ></path>
          </svg>
        </dt>
        <dd>
          <div class="title">
            {{ mainStore.dayjs(mediaInfo.DateTime).format("YYYY年M月D日") }}
          </div>
          <div class="subtitle">
            {{ mainStore.dayjs(mediaInfo.DateTime).format("dddd，HH:mm:ss") }}
          </div>
        </dd>
      </div>

      <div class="info-item">
        <dt>
          <!-- https://photos.google.com icon -->
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"
            ></path>
          </svg>
        </dt>
        <dd>
          <div class="title" :title="mediaInfo.OriginalFilename">
            {{ mediaInfo.OriginalFilename }}
          </div>
          <div class="subtitle">
            <span>{{ mediaInfo.Megapixels }}MP</span
            ><span>{{ mediaInfo.ImageSize }}</span
            ><span>{{ mediaInfo.FileSize }}</span>
          </div>
        </dd>
      </div>

      <div class="info-item" v-show="mediaInfo.Model !== ''">
        <dt>
          <!-- https://photos.google.com icon -->
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              d="M14.25 2.26l-.08-.04-.01.02C13.46 2.09 12.74 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-4.75-3.31-8.72-7.75-9.74zM19.41 9h-7.99l2.71-4.7c2.4.66 4.35 2.42 5.28 4.7zM13.1 4.08L10.27 9l-1.15 2L6.4 6.3A7.958 7.958 0 0 1 12 4c.37 0 .74.03 1.1.08zM5.7 7.09L8.54 12l1.15 2H4.26C4.1 13.36 4 12.69 4 12c0-1.85.64-3.55 1.7-4.91zM4.59 15h7.98l-2.71 4.7A8.033 8.033 0 0 1 4.59 15zm6.31 4.91L14.89 13l2.72 4.7A8 8 0 0 1 12 20c-.38 0-.74-.04-1.1-.09zm7.4-3l-4-6.91h5.43c.17.64.27 1.31.27 2 0 1.85-.64 3.55-1.7 4.91z"
            ></path>
          </svg>
        </dt>
        <dd>
          <div class="title">
            {{ mediaInfo.Make + " " + mediaInfo.Model }}
          </div>
          <div class="subtitle" v-show="mediaInfo.Aperture !== ''">
            <span>ƒ/{{ mediaInfo.Aperture }}</span>
            <span>{{ mediaInfo.ShutterSpeed }}</span>
            <span>{{ mediaInfo.FocalLength }}</span>
            <span>ISO{{ mediaInfo.ISO }}</span>
          </div>
        </dd>
      </div>

      <div class="info-item">
        <dt>
          <!-- https://photos.google.com icon -->
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
            ></path>
            <circle cx="12" cy="9" r="2.5"></circle>
          </svg>
        </dt>
        <dd>
          <div class="title">
            <template v-if="mediaInfo.GPSCountry === ''">
              没有位置信息
            </template>
            <template v-else>
              {{
                mediaInfo.GPSCountry +
                " " +
                mediaInfo.GPSProvince +
                "" +
                mediaInfo.GPSCity
              }}
            </template>
          </div>
        </dd>
      </div>

      <!-- <template v-if="mediaInfo.MediaType === 'photo'">
          <p>Flash : {{ mediaInfo.Flash }}</p>
          <p>ExposureCompensation : {{ mediaInfo.ExposureCompensation }}</p>
          <p>WhiteBalance : {{ mediaInfo.WhiteBalance }}</p>
        </template> -->
    </template>
    <div v-show="mapVisible" id="map-container"></div>
  </div>
</template>

<style scoped>
.info_dialog {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background: white;
  z-index: 1050;
}
.info_dialog > .title {
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  line-height: 1.5rem;
  font-size: 1.125rem;
  letter-spacing: 0;
  font-weight: 400;
  display: flex;
  -ms-flex-pack: justify;
  align-items: center;
  -ms-flex-align: center;
  flex-direction: row-reverse;
  justify-content: flex-end;
  padding: 8px;
  height: 64px;
}
.info_dialog > .detail {
  color: #5f6368;
  display: flex;
  padding: 14px 24px;
  font-family: Roboto, Arial, sans-serif;
  line-height: 1rem;
  font-size: 0.6875rem;
  letter-spacing: 0.0727272727em;
  font-weight: 500;
  text-transform: uppercase;
}

.info-item {
  display: flex;
  padding: 18px 24px;
  color: #3c4043;
}
.info-item dt {
  height: 24px;
  min-width: 40px;
  width: 40px;
}
.info-item svg {
  fill: rgba(0, 0, 0, 0.54);
}
.info-item dd {
  margin: 0;
  overflow: hidden;
}
.info-item .title {
  color: #3c4043;
  word-wrap: break-word;
  font-family: Roboto, Arial, sans-serif;
  line-height: 1.5rem;
  font-size: 1rem;
  letter-spacing: 0.00625em;
  font-weight: 400;
}
.info-item .subtitle {
  align-items: center;
  color: #5f6368;
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
  font-family: Roboto, Arial, sans-serif;
  line-height: 1.25rem;
  font-size: 0.875rem;
  letter-spacing: 0.0142857143em;
  font-weight: 400;
  gap: 10px;
}

#map-container {
  width: 360px;
  height: 240px;
}
</style>
