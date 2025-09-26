import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { init } from '@telegram-apps/sdk'

import App from './App.vue'
import router from './router'

// Initialize Telegram Mini App SDK
init()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
