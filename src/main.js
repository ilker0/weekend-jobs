import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue'
import './assets/index.css'

const app = createApp(App).use(store).use(CKEditor)

app.use(router)

app.mount('#app')
