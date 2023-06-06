<template>
    <div class="flex flex-col relative h-[calc(100vh-64px)]">
        <h3 class="text-center my-5 text-5xl uppercase font-bold kansas">Stock</h3>
        <p id="title" class="font-bold uppercase divider md:mx-[10%]">Select player's food's amount</p>
        <div class="flex justify-center h-100px gap-2">
            <div class="flex flex-col place-items-center" v-for="p in players" :key="p.name" @click="selectPlayer(p)">
                <img :src="p.restaurant.img" alt=""
                    :class="['rounded-full', p.name == selectedPlayer.name ? 'h-12 md:h-20' : 'grayscale opacity-50 h-8 w-8 md:h-16 md:w-16']" />
                <span :class="['text-xl', p.name == selectedPlayer.name ? 'text-primary' : '']">{{ p.name }}</span>
                <span class="opacity-50 text-xs md:text-lg" v-if="p.getNbrOfProduct() > 0">{{ p.getNbrOfProduct() }}
                    emp.</span>
            </div>
        </div>
        <div class="flex justify-center h-full mt-5">
            <div class="flex gap-2 md:gap-10 justify-center h-1/2 md:h-full place-items-center flex-wrap">
                <div class="flex flex-col justify-center place-items-center gap-2 w-[30vw] md:w-[12vw]">
                    <span class="text-center kansas">Clear</span>
                    <div class="btn-group btn-group-vertical lg:btn-group-horizontal">
                        <button class="btn btn-active" @click="reset([selectedPlayer])">This player</button>
                        <button class="btn" @click="reset(players)">all players</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex w-full justify-center fixed bottom-8">
            <NuxtLink to="/dinnertime">
                <button class="btn btn-outline mt-3">Next</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';

const store = useMainStore();

let { players } = storeToRefs(store);
let selectedPlayer = ref(players.value[0]);

onMounted(() => {
    document.getElementById('title').scrollIntoView();
})

const selectPlayer = (player) => {
    selectedPlayer.value = player;
};
</script>

<style></style>