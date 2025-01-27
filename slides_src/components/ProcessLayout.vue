<script setup>
const props = defineProps({
    processes: {
        type: Array
    },
})
</script>

<template>
    <ProcessBaseLayout>
        <template #processTable>
            <ProcessTable :processes="processes" />
        </template>
        <template #processNote>
            <div class="w-1/2">
            <slot></slot>
            </div>
        </template>
        <template #processQueue>
            <ProcessQueue :processes="processes" />
        </template>
        <template #processChart>
            <ProcessChart :processes="processes" />
        </template>
    </ProcessBaseLayout>

</template>

<style scoped></style>