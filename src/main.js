import { createApp } from 'vue'
import App from './App.vue'
import router from '@/plugins/router/index.ts'
import vuetify from "@/plugins/vuetify.ts";

const app = createApp(App);

app.config.globalProperties.$telegramWebApp = window.Telegram.WebApp;

app.use(router)
app.use(vuetify)
app.provide('telegramWebApp', window.Telegram.WebApp)
app.mount('#app')