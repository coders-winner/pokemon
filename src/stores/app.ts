// // Utilities
import { defineStore } from "pinia";

interface State {
  pages: number;
}
export const useStore = defineStore("defineStore", {
  state: (): State => {
    return { pages: 1 };
  },
  getters: {
    getPages(state) {
      return state.pages;
    },
  },
  actions: {
    aPages(value: any) {
      this.pages = value;
    },
  },
});
