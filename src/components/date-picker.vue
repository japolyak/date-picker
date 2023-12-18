<template>
    <div>
        <vue-date-picker v-model="date" :enableTimePicker="false" />
    </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, watch } from "vue";
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();

watch(date, (newVal) => {
    console.log(newVal);
});
</script>

<style scoped>

</style>