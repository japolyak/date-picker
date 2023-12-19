import 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $telegramWebApp:  Telegram.WebApp;
    }
}

export {}