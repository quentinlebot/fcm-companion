<template>
    <div ref="el" :style="{ position: 'fixed', top: y + 'px', left: x + 'px' }" @mousedown="mousedown" @mouseup="mouseup"
        @touchstart="mousedown" @touchend="mouseup" :class="classObject">
    </div>
</template>

<script setup lang="ts">

const el = ref<HTMLElement | null>(null)
const selected = ref(false);
const drag = ref(false);
const { width, height } = useElementSize(el)
const { x: xMouse, y: yMouse, sourceType } = useMouse()
const props = defineProps(['elem'])
let emits = defineEmits(['selected']);

let lastX = 50;
let lastY = 50;
const classObject = reactive({
    'w-[80px]': true,
    'h-[80px]': true,
    'bg-red-300': true,
    'z-[100]': true,
    'selected': selected,
})


const x = computed(() => {
    if (drag.value) {
        lastX = xMouse.value - width.value / 2;
    } else {
        lastX = props.elem.x;
    }
    return lastX;
});
const y = computed(() => {
    if (drag.value) {
        lastY = yMouse.value - height.value / 2;
    } else {
        lastY = props.elem.y;
    }
    return lastY;
});
const mouseup = (e: Event) => {
    drag.value = false;
    selected.value = false;
}
const mousedown = (e: Event) => {
    drag.value = true;
    selected.value = true;
    e.preventDefault();
}

watch(selected, (val) => {
    emits('selected', val, props.elem);
});
onMounted(() => {
});
</script>

<style scoped>
.selected {
    border: 2px solid black;
}
</style>