import { defineStore } from "pinia";
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
  actions: {
    getDayjs: () => {
      return dayjs;
    },
  },
});
