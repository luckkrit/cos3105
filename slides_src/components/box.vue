<script setup>
defineProps(['title','subLeft', 'subRight', 'totalBts'])
</script>

<template>
    <div class="flex flex-col justify-center items-center size-8">
        <!-- <div>{{ title.substring(0,1) }}<sub>{{ title.substring(1) }}</sub></div> -->
         <slot></slot>
        <div class="absolute mt-20 -ml-10">{{ subLeft }}</div>
        <div v-if="subLeft+1 === totalBts" class="absolute mt-20 -mr-10">{{ subRight }}</div>
    </div>
</template>

<style scoped>
</style>