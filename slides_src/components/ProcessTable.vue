<script setup>
const props = defineProps({
    processes: {
        type: Array
    }
})
function sortById(a,b){
    if(a.id<b.id) return -1;
    else if(a.id>b.id) return 1;
    else return 0;
}
</script>

<template>
    <div class="grid grid-rows-6 grid-cols-3 border-b w-1/2">
        <div class="border-b">Process</div>
        <div class="border-b">Arrival Time (AT)</div>
        <div class="border-b">Burst Time (BT)</div>
        <template v-for="p in props.processes.filter((arr)=>arr).sort(sortById)">
            <template v-if="p.id>0 && !p.preemptive">
            <div>{{ p.name }}{{p.id}}{{ p.status }}</div>
            <div>{{ p.at }}</div>
            <div>{{ p.bt }}</div>
            </template>
        </template>
    </div>
</template>

<style scoped></style>