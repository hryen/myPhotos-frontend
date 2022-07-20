<script setup>
import { ref, onMounted } from "vue";
import notFoundImgUrl from "@/assets/thumbnail_not_found.png";
import { Fancybox } from "@fancyapps/ui";
import MediaInfo from "@/components/MediaInfo.vue";

const props = defineProps(["loading", "mediaListMap"]);

let infoVisible = ref(false);
const mediaInfoRef = ref(null);

let livePhotoPlaying = ref(false);
let livePhotoSlideContent = ref({});

function handleThumbnailError(e) {
  e.target.src = notFoundImgUrl;
  e.target.parentElement.classList.add("thumbnail-error");
}

function initFancybox() {
  Fancybox.Plugins.Toolbar.defaults.items.playLivePhoto = {
    type: "button",
    label: "play live photo video",
    // https://fonts.google.com/icons
    html: `<svg xmlns="http://www.w3.org/2000/svg" style="height:24px!important;width:24px!important" height="24" width="24" viewBox="0 0 48 48">
    <path d="M10.25 34.7q-1.7-2.2-2.475-4.25Q7 28.4 6.7 25.85h1.1q.3 2.25 1.125 4.275.825 2.025 2.175 3.725ZM6.7 21.85q.25-2.55 1.05-4.575.8-2.025 
    2.5-4.225l.85.8Q9.75 15.6 8.925 17.6q-.825 2-1.125 4.25ZM21.95 41.2q-2.85-.5-4.75-1.275-1.9-.775-4.1-2.375l.85-.85q1.65 1.25 3.675 2.15 2.025.9 
    4.325 1.25Zm-7.9-30.25-.85-.85q2.2-1.6 4.125-2.35Q19.25 7 22.05 6.5v1.1q-2.3.35-4.325 1.2-2.025.85-3.675 2.15ZM20.4 30.3V17.4l10.15 6.45Zm5.65 
    10.9v-1.1q6.15-.85 10.2-5.45 4.05-4.6 4.05-10.8 0-6.2-4.05-10.8-4.05-4.6-10.2-5.45V6.5q6.65.7 11 5.675T41.4 23.85q0 6.7-4.35 11.675-4.35 4.975-11 
    5.675Z"/></svg>`,
    click: function (event) {
      event.preventDefault();
      toggleLivePhotoVideo();
    },
  };

  Fancybox.Plugins.Toolbar.defaults.items.info = {
    type: "button",
    label: "Toggle info",
    // https://iconpark.oceanengine.com/official
    html: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772
           41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858
            13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none"
             stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807
              11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24
               11Z" fill="#fff"/><path d="M24.5 34V20H23.5H22.5" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M21 34H28" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    click: function (event) {
      event.preventDefault();
      toggleInfo(this.fancybox.getSlide().id);
    },
  };

  Fancybox.bind('[data-fancybox="gallery"]', {
    parentEl: document.getElementById("fancybox-parent"),
    dragToClose: false,
    Toolbar: {
      display: [
        "counter",
        "playLivePhoto",
        "info",
        "zoom",
        "slideshow",
        "fullscreen",
        "thumbs",
        "close",
      ],
    },
    Thumbs: {
      Carousel: {
        fill: false,
        center: true,
      },
    },
    on: {
      closing: (fancybox, event) => {
        infoVisible.value = false;
      },
      "Carousel.ready Carousel.change": (fancybox, carousel, event) => {
        livePhotoPlaying.value = false;
        if (infoVisible.value) {
          mediaInfoRef.value.getMediaInfo(fancybox.getSlide().id);
        }
      },
    },
  });
}

function toggleInfo(id) {
  if (!infoVisible.value) {
    infoVisible.value = true;
    mediaInfoRef.value.getMediaInfo(id);
  } else {
    infoVisible.value = false;
  }
}

function toggleLivePhotoVideo() {
  const fancybox = Fancybox.getInstance();
  // 切换成视频
  if (!livePhotoPlaying.value) {
    // 保存图片的内容，以便后续恢复
    const slide = fancybox.getSlide();
    
    // TODO: 非动态图片不执行操作
    // setCurrentMedia(slide.id);
    // if (currentMedia.value.MediaType !== "LivePhoto") {
    //   return;
    // }

    livePhotoSlideContent.value = slide.$content.cloneNode(true);
    // 清除图片的内容
    fancybox.clearContent(slide);
    // 设置视频的内容
    slide.src += "/video";
    const h =
      `<video class="fancybox__html5video" autoplay loop>
  <source src="` +
      slide.src +
      `" type="">Sorry, your browser doesn't support embedded videos.</video>`;
    fancybox.setContent(slide, h);
    livePhotoPlaying.value = true;
  } else {
    // 切换成图片 TODO: 切换回图片后不能放大了
    // 先清除视频的内容
    const slide = fancybox.getSlide();
    fancybox.clearContent(slide);
    slide.src = slide.src.replace("/video", "");
    // 设置成之前保存好的图片的内容
    slide.$content = livePhotoSlideContent.value;
    fancybox.setContent(slide, livePhotoSlideContent.value);
    livePhotoPlaying.value = false;
  }
}

onMounted(() => {
  initFancybox();
});

const emit = defineEmits(['loadMore'])
function loadMore(e) {
  const { scrollTop, clientHeight, scrollHeight } = e.target;
  //   console.log(scrollTop, clientHeight, scrollHeight);
  if (
    // 滚动到倒数第二排的时候（一排的高度是256），加载下一页
    !props.loading &&
    scrollTop + clientHeight >= scrollHeight - 300
  ) {
    emit('loadMore');
  }
}
</script>

<template>
  <div class="media-list" @scroll.passive="loadMore">
    <template v-for="(v, k) in props.mediaListMap">
      <span class="day-title">{{ k }}</span>
      <div class="day-group">
        <template v-for="item in v">
          <a
            class="thumbnail"
            data-fancybox="gallery"
            :data-type="item.MediaType === 'video' ? 'html5video' : ''"
            :data-id="item.ID"
            :data-src="'http://127.0.0.1/api/medias/' + item.ID"
          >
            <img
              loading="lazy"
              :src="'http://127.0.0.1/api/medias/' + item.ID + '/thumbnail'"
              @error="handleThumbnailError"
            />

            <div v-if="item.MediaType === 'video'" class="special-photo">
              {{ item.Duration
              }}<svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 48 48"
                fill="#fff"
              >
                <path
                  d="M19.15 32.5 32.5 24l-13.35-8.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"
                />
              </svg>
            </div>

            <div v-if="item.MediaType === 'LivePhoto'" class="special-photo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 48 48"
                fill="#fff"
              >
                <path
                  d="M22.5 7.5V2h3v5.5Zm0 38.5v-5.5h3V46Zm18-20.5v-3H46v3ZM2 25.5v-3h5.5v3ZM37.1 13l-2.15-2.15 3.3-3.3L40.4 9.7ZM9.75 40.45 7.6 38.3l3.3-3.3 2.15 2.15Zm28.5 0-3.3-3.3L37.1 35l3.3 3.3ZM10.9 13 7.6 9.7l2.15-2.15 3.3 3.3ZM24 35.25q-4.7 0-7.975-3.275Q12.75 28.7 12.75 24q0-4.7 3.275-7.975Q19.3 12.75 24 12.75q4.7 0 7.975 3.275Q35.25 19.3 35.25 24q0 4.7-3.275 7.975Q28.7 35.25 24 35.25Zm0-3q3.45 0 5.85-2.4 2.4-2.4 2.4-5.85 0-3.45-2.4-5.85-2.4-2.4-5.85-2.4-3.45 0-5.85 2.4-2.4 2.4-2.4 5.85 0 3.45 2.4 5.85 2.4 2.4 5.85 2.4ZM24 24Z"
                />
              </svg>
            </div>
          </a>
        </template>
      </div>
    </template>
  </div>
  <MediaInfo
    ref="mediaInfoRef"
    :infoVisible="infoVisible"
    @close="infoVisible = false"
  />

  <div id="fancybox-parent" :class="[infoVisible ? 'fancybox-less' : '']"></div>

  <transition name="fade">
    <p v-if="props.loading" class="loading">Loading</p>
  </transition>
</template>

<style>
@import "@fancyapps/ui/dist/fancybox.css";
.fancybox-less > .fancybox__container {
  right: 360px !important;
}

video:focus {
  outline: none !important;
}
</style>

<style scoped>
.media-list {
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 10px;
}
.day-title {
  position: relative;
  top: 0;
  left: 0;

  padding-top: 16px;
  font-size: 0.875rem;
  letter-spacing: 0.0142857143em;
  font-weight: 400;
  line-height: 24px;
}
.day-group {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
}

.thumbnail {
  cursor: pointer;
  position: relative;
}
.thumbnail-error {
  width: 256px;
  height: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.special-photo {
  position: absolute;
  top: 0;
  right: 0;

  padding: 4px;

  display: flex;
  justify-content: flex-end;
  gap: 4px;
  line-height: 24px;

  color: white;
  font-size: 12px;
}

.loading {
  position: fixed;
  bottom: 15%;
  left: 0;
  right: 0;
  width: 100px;
  margin: auto;
  padding: 10px 0;
  color: #fff;
  text-align: center;
  background: #333;
  border-radius: 4px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
