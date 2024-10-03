import axios from 'axios'
import { defineStore } from 'pinia'
import statusStore from '@/stores/statusStore'

const status = statusStore()

export default defineStore('productStore', {
  state: () => ({
    products: []
  }),
  getters: {
    sortedProducts: (state) => state.products.sort((a, b) => a.price - b.price)
  },
  actions: {
    getProducts() {
      const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products/all`
      status.isLoading = true
      axios.get(api).then((res) => {
        this.products = res.data.products
        status.isLoading = false
      })
    }
  }
})
