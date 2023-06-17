<template>
    <div ref="el" :style="style" style="position: fixed" @mousemove="logParent($event)"
        :class="['w-[80px] h-[80px] border-2 border-red-300', selected ? 'selected' : '']">
    </div>
</template>

<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { useParentElement } from '@vueuse/core'

const parentEl = useParentElement()

const el = ref<HTMLElement | null>(null)

const { x, y, style } = useDraggable(el, {
    initialValue: { x: 40, y: 40 },
})

let props = defineProps([]);
let emits = defineEmits(['selected']);
const selected = ref(false);

const logParent = (event: any) => {
    console.log(document.elementsFromPoint(event.clientX, event.clientY)[1]);
}

watch(selected, (val) => {
    emits('selected', val);
});
onMounted(() => {
    console.log(parentEl.value)
})
</script>

<style scoped>
.selected {
    border: 2px solid black;
}
</style>