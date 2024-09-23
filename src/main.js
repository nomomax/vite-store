import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

import { currency } from '@/methods/filters'

const app = createApp(App)

app.config.globalProperties.$filters = {
  currency
}
app.use(createPinia())
app.use(VueAxios, axios)
app.use(router)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Loading', Loading)

app.mount('#app')
