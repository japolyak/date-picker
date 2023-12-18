<template>
    <div>
        <vue-date-picker v-model="date" />
    </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
onMounted(() => {
    if (window.Telegram.Webapp) {
        console.log('Telegram Webapp detected');
    }
})
</script>

<style scoped>

</style>