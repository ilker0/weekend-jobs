import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";


import './assets/index.css'

Sentry.init({
    App,
    dsn: "https://66443398b9f04429a0e46415149d4380@o1050291.ingest.sentry.io/6251401",
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "http://localhost:3000/", /^\//],
        }),
    ],
   
    tracesSampleRate: 1.0,
});

const app = createApp(App).use(store)

app.use(router)

app.mount('#app')
