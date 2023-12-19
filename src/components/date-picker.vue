<template>
    <div>
        <vue-date-picker v-model="date" />
        {{ telegramWebApp.initData?.user?.id }}
    </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();

onMounted(() => {
    telegramWebApp.MainButton.show();
    telegramWebApp.BackButton.show();
})
</script>

<style scoped>

</style>