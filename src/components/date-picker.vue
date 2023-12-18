<template>
    <div>
        <vue-date-picker v-model="date" />
        {{ $telegramWebApp }}
    </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
</script>

<style scoped>

</style>