import { defineStore } from "pinia";
import settings from "@/config/settings.json";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

export const useMainStore = defineStore("main", {
  state: () => ({
    currentMenu: "photos",
    searchInfo: "",
    loading: false,
    searchMediaListMap: {},
  }),
  getters: {
    settings: () => settings,
    dayjs: () => dayjs,
  },
});
