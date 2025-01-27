<script setup>
    defineProps(['data'])
</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="flex gap-2 w-full">
            <slot name="processTable"></slot>
            <slot name="processNote"></slot>
        </div>
        <div class="flex">
            <slot name="processQueue"></slot>
        </div>
        <div class="flex">
            <slot name="processChart"></slot>
        </div>
    </div>
</template>

<style scoped>
</style>