<script setup>
import { computed } from 'vue'

const props = defineProps({
    processes: {
        type: Array
    },
})

let count = 0

const totalBts = computed(() => {
    const initialValue = 0;
    const sumWithInitial = props.processes.reduce(function (acc, obj) { if (obj.preemptive) { return acc; } else { return acc + obj.bt; } }, initialValue);
    return sumWithInitial
})
const totalBurst = computed(() => {
    const initialValue = 0;
    const sumWithInitial = props.processes.reduce(function (acc, obj) { return acc + obj.total; }, initialValue);
    return sumWithInitial
})
function sortOrder(a, b) {
    if (a.order < b.order) {
        return -1;
    } else if (a.order > b.order) {
        return 1;
    } else {
        return 0;
    }
}
function process(i) {
    return props.processes.sort(sortOrder)[i]
}
function increment() {
    if (count >= totalBurst.value) {
        count = 0;
    }
    return count++;
}


</script>

<template>
    <div class="flex flex mx-auto w-fit mt-3 justify-center">
        <template :key="i" v-for="(d, i) in totalBts">
            <template v-if="i < props.processes.length">
                <template :key="'i'+q" v-for="(p, q) in process(i).total">
                    <box v-if="process(i).id > 0" :class="`${process(i).color}`" class="border" :subLeft="increment()"
                        :subRight="count" :totalBts="totalBts">{{ props.processes[i].name }}{{ props.processes[i].id }}
                    </box>
                    <box v-else :class="`${process(i).color}`" class="border" :subLeft="increment()" :subRight="count"
                        :totalBts="totalBts"></box>
                </template>
            </template>
            <template v-if="i >= count">
                <box class="border" :subLeft="i" :subRight="i + 1" :totalBts="totalBts"></box>
            </template>
        </template>
    </div>

</template>

<style scoped></style>