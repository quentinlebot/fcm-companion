<template>
    <div ref="el" :style="style" style="position: fixed"
        :class="['w-[120px] h-[180px] bg-red-300', selected ? 'selected' : '']">
    </div>
</template>

<script setup lang="ts">
import { useDraggable } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)

const { x, y, style } = useDraggable(el, {
    initialValue: { x: 40, y: 40 },
})

let props = defineProps([]);
let emits = defineEmits(['selected']);
const selected = ref(false);

watch(selected, (val) => {
    emits('selected', val);
});
</script>

<style scoped>
.selected {
    border: 2px solid black;
}
</style>