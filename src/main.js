import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import AppFuncs from '@/plugins/app'
import Firebase from '@/plugins/firebase'
import vue3VideoPlayer from "@/plugins/vue3-video-player";
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';

import '@/assets/scss/main.scss'

let app = createApp(App);

app.use(VueCookies);
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCzhV-RA207hYdmgbbS2nl5rE2A0TpB_gI',
  },
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})
app.use(router)
app.use(vue3VideoPlayer)

app.use(AppFuncs);
app.use(Firebase);
app.mount('#app')

// Setup plugin for defaults or `$screens` (optional)
app.use(SetupCalendar, {})
// Use the components
app.component('Calendar', Calendar)
app.component('DatePicker', DatePicker)

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware }, app.$cookies, app.config.globalProperties.$app.$api);
  }

  return next();
});
