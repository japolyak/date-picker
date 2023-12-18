import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.config.globalProperties.$telegramWebApp = window.Telegram.WebApp;

app.mount('#app')