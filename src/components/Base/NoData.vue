<template>
    <div
        class="min-h-full w-full flex flex-col items-center justify-center overflow-hidden"
        :style="[`${maxHFull && 'height: 100%;' || 'min-height: 75vh;'}`]"
    >
        <img src="@/assets/images/not-alerts-thumb.png" class="object-cover" alt="">
        <div class="p-4 text-xl text-teal-700">{{ text }}</div>
    </div>
</template>

<script setup>
    const props = defineProps(['text', 'maxHFull'])
</script>
