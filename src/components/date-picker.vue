<template>
    <div class="px-4 pt-4">
        <vue-date-picker v-model="date" />

        <v-switch v-model="setAssignment" label="Set assignment" color="primary" hide-details />
        <template v-if="setAssignment">
            {{ test }}
            <v-switch v-model="includeH1" label="Hurra 1" color="primary" hide-details />
            <v-textarea v-if="includeH1" v-model="setH1" variant="outlined" hide-details auto-grow rows="1" />

            <v-switch v-model="includeH2" label="Hurra 2" color="primary" hide-details />
            <v-textarea v-if="includeH2" v-model="setH2" variant="outlined" hide-details auto-grow rows="1" />

            <v-switch v-model="includeH3" label="Hurra 3" color="primary" hide-details />
            <v-textarea v-if="includeH3" v-model="setH3" variant="outlined" hide-details auto-grow rows="1" />

            <v-switch v-model="includeCNC" label="Czas na czasownik" color="primary" hide-details />
            <v-textarea v-if="includeCNC" v-model="setCNC" variant="outlined" hide-details auto-grow rows="1" />

            <v-switch v-model="includeUZ" label="Umiesz zdasz" color="primary" hide-details />
            <v-textarea v-if="includeUZ" v-model="setUZ" variant="outlined" hide-details auto-grow rows="1" />

            <v-switch v-model="includeMT" label="Megatest" color="primary" hide-details />
            <v-textarea v-if="includeMT" v-model="setMT" variant="outlined" hide-details auto-grow rows="1" />

            <v-switch v-model="includeAnother" label="Dodatkowe" color="primary" hide-details />
            <v-textarea v-if="includeAnother" v-model="setAnother" variant="outlined" hide-details auto-grow rows="1" />
            <v-btn color="primary" @click="planNewClass()">Plan</v-btn>
        </template>
    </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted, inject, computed, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { ApplicationClient } from '@/services/api/application-client';
import type { SourceDto, NewClassDto } from '@/services/api/api.models';

const date = ref();
const test = ref('test');

// Assignment
const setAssignment = ref(false);
const includeH1 = ref(false);
const setH1 = ref<string | null>(null);
const includeH2 = ref(false);
const setH2 = ref<string | null>(null);
const includeH3 = ref(false);
const setH3 = ref<string | null>(null);
const includeCNC = ref(false);
const setCNC = ref<string | null>(null);
const includeUZ = ref(false);
const setUZ = ref<string | null>(null);
const includeMT = ref(false);
const setMT = ref<string | null>(null);
const includeAnother = ref(false);
const setAnother = ref<string | null>(null);

const route = useRoute();
const telegramWebApp = inject('telegramWebApp');

const privateCourseId = computed(() => {
  if (Array.isArray(route.params.privateCourseId)) return null;

  const privateCourseId = parseInt(route.params.privateCourseId);
  return isNaN(privateCourseId) ? null : privateCourseId;
});

const memoizedCallback = ref(() => {
    test.value = 'test2';
});

watchEffect(() => {
    telegramWebApp.onEvent('mainButtonClicked', memoizedCallback.value)
});

function planNewClass() {
    if (privateCourseId.value === null) return;
    const a: NewClassDto = {
        date: "asdadsa",
        sources: [{
            title: 'asd',
            assignment: 'asd',
        }]
    };

    const request = ApplicationClient.planNewClass(privateCourseId.value, a);
}

onMounted(() => {
    telegramWebApp.MainButton.isVisible = true;
});

watch()
</script>

<style scoped>

</style>