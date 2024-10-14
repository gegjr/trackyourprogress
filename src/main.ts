import { createApp } from 'vue'
import VButton from '@/components/VButton.vue'

import { createPinia } from 'pinia'
const pinia = createPinia()

import 'reset-css';
import './style.css'
import App from './App.vue'
// TODO: what does this error mean
import router from './router/index.js'

createApp(App)
    .component('VButton', VButton)
    .use(router)
    .use(pinia)
    .mount('#app')
