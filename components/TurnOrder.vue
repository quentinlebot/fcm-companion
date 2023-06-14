<template>
    <div class="flex flex-col h-[calc(100vh-64px)] relative">
        <h3 class="text-center my-5 text-5xl uppercase font-bold kansas">Turn order</h3>
        <p id="title" class="font-bold uppercase divider md:mx-[10%]">Drag to arrange order of buisness</p>
        <div class="italic mt-2 md:mt-20 text-center" v-if="players.length < 1">
            Start with adding players
            <nuxt-link class="link link-primary" to="/player">here</nuxt-link>
        </div>
        <div v-if="players.length > 1">
            <div class="flex justify-center h-full">
                <div class="md:w-1/3">
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
            <div class="flex w-full justify-center fixed bottom-8">
                <NuxtLink to="/worker">
                    <button class="btn btn-outline mt-3">Next</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/main';
import draggable from 'vuedraggable';

const store = useMainStore();

let { players } = storeToRefs(store);

onMounted(() => {
    store.setTurnOrder(players.value);
});

watch(players, () => {
    store.setTurnOrder(players.value);
});
</script>

<style></style>