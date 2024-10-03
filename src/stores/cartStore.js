import axios from 'axios'
import { defineStore } from 'pinia'
import statusStore from '@/stores/statusStore'

const status = statusStore()

export default defineStore('cartStore', {
  state: () => ({
    cart: {
      carts: []
    }
  }),
  actions: {
    getCart() {
      const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
      status.isLoading = true
      axios.get(api).then((res) => {
        this.cart = res.data.data
        status.isLoading = false
      })
    },
    updateCart(item) {
      const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart/${item.id}`
      status.isLoading = true
      status.cartLoadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      axios.put(api, { data: cart }).then((res) => {
        console.log(res)
        status.cartLoadingItem = ''
        this.getCart()
      })
    },
    removeCartItem(id) {
      const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart/${id}`
      status.isLoading = true
      axios.delete(api).then((res) => {
        console.log(res)
        status.pushMessage({ title: '刪除購物車' })
        this.getCart()
      })
    },
    addToCart(id) {
      const api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
      const cart = {
        product_id: id,
        qty: 1
      }
      status.cartLoadingItem = id
      axios.post(api, { data: cart }).then((res) => {
        console.log(res)
        status.pushMessage({ title: '加入購物車' })
        status.cartLoadingItem = ''
        this.getCart()
      })
    }
  }
})
