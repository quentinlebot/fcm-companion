<template>
    <div ref="cellHover" :class="classObject" cell="fromMap" :id="cell.id" :row="cell.row" :col="cell.col">
        <div class="flex justify-center place-items-center h-full w-full">{{ props.cell.id }}</div>
        <!-- <div class="absolute grid grid-cols-2 grid-rows-2 h-full w-full">
            <div ref="topLeft" :class="{ 'bg-red-300': props.cell.pointerSide == 'TL' }"></div>
            <div ref="topRight" :class="{ 'bg-red-300': props.cell.pointerSide == 'TR' }"></div>
            <div ref="bottomLeft" :class="{ 'bg-red-300': props.cell.pointerSide == 'BL' }"></div>
            <div ref="bottomRight" :class="{ 'bg-red-300': props.cell.pointerSide == 'BR' }"></div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { Cell } from '~/types/types';

const props = defineProps(['cell']) as { cell: Cell };
const emits = defineEmits(['hovered']);

// const cellHover = ref()
// const topLeft = ref()
// const topRight = ref()
// const bottomLeft = ref()
// const bottomRight = ref()

// const { isOutside: cellOutside } = useMouseInElement(cellHover);
// const { isOutside: topLeftOutside } = useMouseInElement(topLeft);
// const { isOutside: topRightOutside } = useMouseInElement(topRight);
// const { isOutside: bottomLeftOutside } = useMouseInElement(bottomLeft);
// const { isOutside: bottomRightOutside } = useMouseInElement(bottomRight);

const classObject = reactive({
    cell: true,
    relative: true,
    'h-[40px]': true,
    'w-[40px]': true,
    'flex': true,
    'justify-center': true,
    'place-items-center': true,
    'border-white': true,
    'border-t-2': props.cell.border[0],
    'border-r-2': props.cell.border[1],
    'border-b-2': props.cell.border[2],
    'border-l-2': props.cell.border[3],
})


// watch(cellOutside, (val) => {
//     if (val)
//         props.cell.pointerSide = '';
// });
// watch(topLeftOutside, (val) => {
//     if (!val) {
//         props.cell.pointerSide = 'TL';
//         emits('hovered', props.cell);
//     }
// });
// watch(topRightOutside, (val) => {
//     if (!val) {
//         props.cell.pointerSide = 'TR';
//         emits('hovered', props.cell);
//     }
// });
// watch(bottomLeftOutside, (val) => {
//     if (!val) {
//         props.cell.pointerSide = 'BL';
//         emits('hovered', props.cell);
//     }
// });
// watch(bottomRightOutside, (val) => {
//     if (!val) {
//         props.cell.pointerSide = 'BR';
//         emits('hovered', props.cell);
//     }
// });
watch(props.cell, (val) => {
    classObject['border-t-2'] = val.border[0];
    classObject['border-r-2'] = val.border[1];
    classObject['border-b-2'] = val.border[2];
    classObject['border-l-2'] = val.border[3];
});
</script>

<style scoped>
.cell:hover {
    /* background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 1);
    padding: 1px; */
}
</style>