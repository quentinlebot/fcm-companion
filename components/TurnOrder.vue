<template>
    <div class="flex flex-col h-[calc(100vh-150px)]">
        <h3 class="text-center m-5 text-5xl uppercase font-bold kansas">Turn order</h3>
        <div class="flex justify-center h-full">
            <div class="md:w-1/3">
                <p class="font-bold uppercase divider">Drag to arrange turn order</p>
                <div class="italic mt-2 md:mt-20 text-center" v-if="players.length < 1">
                    Start with adding players
                    <nuxt-link class="link link-primary" to="/player">here</nuxt-link>
                </div>

                <draggable v-model="players" item-key="name">
                    <template #item="{ element: player }">
                        <div class="flex justify-evenly place-items-center hover:flex-row hover:bg-neutral mt-2">
                            <div class="w-1/6 text-2xl kansas">
                                {{ player.turnOrder }}
                            </div>
                            <img :src="player.restaurant.img" class="rounded-box w-1/6 max-w-[90px]" />
                            <div class="w-1/3 ml-2 opacity-50 text-xl   ">{{ player.restaurant.name }}</div>
                            <div class="w-1/3 font-bold text-2xl text-end">{{ player.name }}</div>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
        <div class="flex w-full justify-center">
            <NuxtLink to="/worker" class="">
                <button class="btn btn-outline mt-3" :disabled="players.length < 2">Next</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import draggable from 'vuedraggable';

const store = usePlayerStore();

let { players } = storeToRefs(store);

onMounted(() => {
    store.setTurnOrder(players.value);
});

watch(players, () => {
    store.setTurnOrder(players.value);
});
</script>

<style></style>