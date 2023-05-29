<template>
    <div class="flex flex-col relative h-[calc(100vh-64px)]">
        <h3 class="text-center my-5 text-5xl uppercase font-bold kansas">Workers</h3>
        <p class="font-bold uppercase divider md:mx-[10%]">Select active worker for this turn</p>
        <div class="flex justify-center h-100px gap-2">
            <div class="flex flex-col text-center" v-for="p in players" :key="p.name" @click="selectPlayer(p)">
                <img :src="p.restaurant.img" alt=""
                    :class="['h-12', 'md:h-20', 'rounded-full', p.name == selectedPlayer.name ? '' : 'grayscale opacity-50']" />
                <span :class="['text-xl', p.name == selectedPlayer.name ? 'text-primary' : '']">{{ p.name }}</span>
                <span>0</span>
            </div>
        </div>
        <div class="flex justify-center h-full">
            <div class="flex gap-2 md:gap-10 justify-center h-full place-items-center flex-wrap">

                <div class="indicator w-[30vw] md:w-1/5" @click="increase('p')">
                    <span class="indicator-item indicator-center badge badge-secondary">0</span>
                    <img class="cursor-pointer opacity-60 hover:opacity-100" src="/img/e_pricing_manager.jpg" format="webp"
                        sizes="19vw" />
                </div>
                <div class="indicator w-[30vw] md:w-1/5" @click="increase('d')">
                    <span class="indicator-item indicator-center badge badge-secondary">0</span>
                    <img class="cursor-pointer opacity-60 hover:opacity-100" src="/img/e_discount_manager.jpg" format="webp"
                        sizes="19vw" />
                </div>
                <div class="indicator w-[30vw] md:w-1/5" @click="increase('l')">
                    <span class="indicator-item indicator-center badge badge-secondary">0</span>
                    <img class="cursor-pointer opacity-60 hover:opacity-100" src="/img/e_luxuries_manager.jpg" format="webp"
                        sizes="19vw" />
                </div>
                <div class="indicator w-[30vw] md:w-1/5" @click="increase('c')">
                    <span class="indicator-item indicator-center badge badge-secondary">0</span>
                    <img class="cursor-pointer opacity-60 hover:opacity-100" src="/img/e_cfo.jpg" format="webp"
                        sizes="19vw" />
                </div>
                <div class="indicator w-[30vw] md:w-1/5" @click="increase('w')">
                    <span class="indicator-item indicator-center badge badge-secondary">0</span>
                    <img class="cursor-pointer opacity-60 hover:opacity-100" src="/img/e_waitress.jpg" format="webp"
                        sizes="19vw" />
                </div>
            </div>
        </div>
        <div class="flex w-full justify-center fixed bottom-5">
            <NuxtLink to="/milestone" class="">
                <button class="btn btn-outline mt-3" :disabled="players.length < 2">Next</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';
import { Player } from '~/types/player';

const store = useMainStore();

let { players } = storeToRefs(store);
let selectedPlayer = ref(players.value[0]);

const selectPlayer = (player) => {
    selectedPlayer.value = player;
};
</script>

<style></style>