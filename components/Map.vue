<template>
    <div class="map flex flex-col gap-3 place-items-center justify-start pt-5 h-[calc(100vh-64px)]">
        <div class="join">
            <input class="join-item btn" type="radio" name="options" aria-label="2" value="2" v-model="nbPlayers" />
            <input class="join-item btn" type="radio" name="options" aria-label="3" value="3" v-model="nbPlayers" />
            <input class="join-item btn" type="radio" name="options" aria-label="4" value="4" v-model="nbPlayers" />
            <input class="join-item btn" type="radio" name="options" aria-label="5" value="5" v-model="nbPlayers" />
            <input class="join-item btn" type="radio" name="options" aria-label="6" value="6" v-model="nbPlayers" />
        </div>
        <!-- <card></card> -->
        <div :class="['grid', `grid-cols-${grid.width}`, `grid-rows-${grid.height}`, 'gap-0']">
            <tile v-for="tile in tiles" :img="tile.img" class="h-[195px] w-[195px]"
                :style="`transform: rotate(${tile.rot}deg);`"></tile>
        </div>
    </div>
</template>

<script setup lang="ts">

let tiles: Ref<{ img: string, rot: number }[]> = ref([]);
let mapSize: any = {
    '2': {
        width: 3,
        height: 3,
    },
    '3': {
        width: 4,
        height: 3,
    },
    '4': {
        width: 4,
        height: 4,
    },
    '5': {
        width: 5,
        height: 4,
    },
    '6': {
        width: 6,
        height: 4,
    },
}
let nbPlayers = ref('2');
let grid: Ref<{ width: number, height: number }> = ref(mapSize[nbPlayers.value]);
const MAX_TILE = 26;


const generateMap = () => {
    while (tiles.value.length < grid.value.width * grid.value.height) {
        let randomName = Math.floor(Math.random() * MAX_TILE) + 1;
        let randomStr = randomName.toString().padStart(2, '0');
        let randomRot = Math.floor(Math.random() * 4) * 90;
        if (!tiles.value.find(elem => elem.img === `/img/map${randomStr}.jpg`))
            tiles.value.push({ img: `/img/map${randomStr}.jpg`, rot: randomRot });
    }
}

onMounted(() => {
    generateMap();
})

watch(nbPlayers, (val) => {
    grid.value = mapSize[val];
    tiles.value = [];
    generateMap();
})
</script>

<style scoped>
.map {
    overflow: hidden;
}
</style>