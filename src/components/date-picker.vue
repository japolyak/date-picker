<template>
    <div class="px-4 pt-4">
        <vue-date-picker v-model="date" @update:model-value="setTelegramMainButtonState" />

        <div class="d-flex justify-start">
            <v-switch v-model="setAssignment" label="Set assignment" color="primary" hide-details :class="elementTheme" />
        </div>
        <template v-if="setAssignment">
            <div style="color: red">
                {{ test }}
                {{ test1 }}
            </div>
            <div v-for="(item, index) in items" :key="index">
                <v-switch
                    v-model="item.include"
                    :label="item.title"
                    color="primary"
                    hide-details
                    :class="elementTheme"
                    :key="`${index}-switch`"
                    @update:modelValue="!item.include ? item.value = null : null"
                />
                <v-textarea
                    v-if="item.include"
                    v-model="item.value"
                    variant="outlined"
                    hide-details
                    rows="1"
                    :bg-color="textareaBgColor"
                    auto-grow
                    :key="`${index}-textarea`"
                />
            </div>
            <v-btn text="Test" color="primary" @click="planNewClass" />
        </template>
    </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { ref, onMounted, inject, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { ApplicationClient } from '@/services/api/application-client';
import type { SourceDto, NewClassDto } from '@/services/api/api.models';

interface Item {
    title: string;
    value: string | null;
    include: boolean;
}

const date = ref<Date>(null);
const test = ref();
const test1 = ref();
const applicationTheme = ref<string | null>(null);

// Assignment
const setAssignment = ref(false);
const items = ref<Array<Item>>([
    { title: 'Hurra 1', value: null, include: false },
    { title: 'Hurra 2', value: null, include: false },
    { title: 'Hurra 3', value: null, include: false },
    { title: 'Czas na czasownik', value: null, include: false },
    { title: 'Umiesz zdasz', value: null, include: false },
    { title: 'Megatest', value: null, include: false },
    { title: 'Dodatkowe', value: null, include: false },
]);

const route = useRoute();
const telegramWebApp = inject('telegramWebApp');

const elementTheme = computed(() => applicationTheme.value === 'dark' ? 'dark-theme' : 'bright-theme');
const textareaBgColor = computed(() => applicationTheme.value === 'dark' ? '#f1f1f1' : '');
const setTelegramMainButtonState = () => {
    if (date.value && !telegramWebApp.MainButton.isActive) {
        telegramWebApp.MainButton.text = 'Plan class';
        telegramWebApp.MainButton.enable();
        telegramWebApp.MainButton.show();
        return;
    }

    if (date.value && !telegramWebApp.MainButton.isVisible) {
        telegramWebApp.MainButton.show();
        return;
    }

    if (!date.value && telegramWebApp.MainButton.isVisible) {
        telegramWebApp.MainButton.hide();
        return;
    }
};

const privateCourseId = computed(() => {
  if (Array.isArray(route.params.privateCourseId)) return null;

  const privateCourseId = parseInt(route.params.privateCourseId);
  return isNaN(privateCourseId) ? null : privateCourseId;
});

watchEffect(() => {
    telegramWebApp.onEvent('mainButtonClicked', planNewClass);
});

function planNewClass() {
    if (privateCourseId.value == null || date.value == null || items.value == null) return;

    const sources: SourceDto[] = items.value.map((item) => {
        if (item.include && item.value) return { title: item.title, assignment: item.value };
        return null;
    }).filter((item) => item != null);

    const payload: NewClassDto = {
        date: "someDate",
        sources: [...sources]
    };

    const request = ApplicationClient.planNewClass(privateCourseId.value, payload);
}

onMounted(() => {
    applicationTheme.value = telegramWebApp.themeParams.secondary_bg_color === '#1c1c1d' ? 'dark' : 'bright';
});
</script>

<style lang="scss">
.dark-theme {
    .v-label {
        color: #f1f1f1;
    }
}

.bright-theme {
    .v-label {
        color: #1c1c1d;
    }
}
</style>