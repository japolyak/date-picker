<template>
    <div class="px-4 pt-4">
        <vue-date-picker v-model="date" name="blya" range  />
        {{ $telegramWebApp.initDataUnsafe?.user?.id }}
        {{ privateCourseId }}
        <v-switch v-model="setAssignment" label="Set assignment" color="primary" hide-details />
        <template v-if="setAssignment">
            <v-switch v-model="includeH1" label="Hurra 1" color="primary" hide-details />
            <v-textarea
                v-if="includeH1"
                v-model="setH1"
                variant="outlined"
                hide-details
                auto-grow=""
                rows="2"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted, inject, computed } from 'vue';
import { useRoute } from 'vue-router';

const date = ref();

// Assignment
const setAssignment = ref(false);
const includeH1 = ref(false);
const setH1 = ref<string | null>(null);

const route = useRoute();
const telegramWebApp = inject('telegramWebApp');

const privateCourseId = computed(() => {
  if (Array.isArray(route.params.privateCourseId)) return null;

  const privateCourseId = parseInt(route.params.privateCourseId);
  return isNaN(privateCourseId) ? null : privateCourseId;
});

onMounted(() => {
    console.log(telegramWebApp.initDataUnsafe);
    console.log(privateCourseId.value);
});
</script>

<style scoped>

</style>