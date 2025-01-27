<script setup>
const props = defineProps({
    processes: {
        type: Array
    }
})
</script>

<template>
    <div class="grid grid-cols-5 gap-3">
        <template v-for="p in props.processes">
            <process v-if="p.show"  :at="p.at" :bt="p.bt" :btNew="p.btNew">{{ p.name }}{{ p.id }}</process>
        </template>
    </div>
</template>

<style scoped></style>