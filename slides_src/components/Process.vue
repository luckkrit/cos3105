<script setup>
defineProps(['at', 'bt', 'btNew'])
</script>

<template>
    <div class="flex flex-col border size-20">
        <div class="h-full w-full flex items-center justify-center bg-slate-300"><slot></slot></div>
        <div class="flex border-b border-t justify-between w-full">
            <div class="w-1/2 flex justify-center border-r">AT</div>
            <div class="w-1/2 flex justify-center">{{ at }}</div>
        </div>
        <div class="flex content-center justify-between w-full">
            <div class="w-1/2 flex justify-center border-r">BT</div>
            <div v-if="btNew>=0" class="w-1/2 flex justify-center">
                <div class="line-through inlink-block">{{ bt }}</div>
                <div class="inline-block text-red-500 ml-1">({{ btNew }})</div>
            </div>
            <div v-else class="w-1/2 flex justify-center">{{ bt }}</div>
        </div>
    </div>
</template>

<style scoped>
</style>