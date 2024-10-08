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

import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import { currency, date } from '@/methods/filters'
import $httpMessageState from '@/methods/pushMessageState'

const app = createApp(App)

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

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
// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Form', Form);
// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app')
