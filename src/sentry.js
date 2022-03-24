import { BrowserTracing } from '@sentry/tracing'
import * as Sentry from '@sentry/vue'

export default function init(App, router) {
  Sentry.init({
    App,
    dsn: import.meta.env.VITE_SENTRY_TOKEN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'http://localhost:3000', /^\//]
      })
    ],

    tracesSampleRate: 1.0
  })
}
