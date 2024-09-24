import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { currency, date } from '@/methods/filters'
import $httpMessageState from '@/methods/pushMessageState'

const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  currency
}
app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(createPinia())
app.use(VueAxios, axios)
app.use(router)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Loading', Loading)

app.mount('#app')
