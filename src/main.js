import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/index.css'
import './sentry'
import sentry from './sentry'

sentry(App, router)

const app = createApp(App).use(store)

app.use(router)

app.mount('#app')
