import {
  defineStore
} from "pinia";

export const useStore = defineStore('module', {
  state: () => {
    return {
      formData: {}
    }
  },
  getters: {},
  actions: {
    submit(formData) {
      this.formData = formData
    },
    reset() {
      this.formData = {}
    }
  }
})