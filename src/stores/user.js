import { defineStore } from 'pinia'

export default defineStore('User Store', {
  // data
  state: () => ({
    name: 'nomomax',
    wallet: 300
  }),

  // computed
  getters: {
    getUserName: (state) => `我的名字叫做 ${state.name}`
  },

  // methods
  actions: {
    // 可以使用 this
    updateName() {
      this.name = '杰倫'
    }
  }
})
