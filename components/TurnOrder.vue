<template>
    <div class="flex flex-col">
        <h3 class="text-center m-5 text-5xl uppercase font-bold kansas">Turn order</h3>
        <div class="flex justify-center">
            <div class="md:w-1/3">
                <p class="font-bold uppercase divider">Drag to arrange turn order</p>
                <div class="italic mt-2 md:mt-20 text-center" v-if="players.length < 1">
                    Start with adding players
                    <nuxt-link class="link link-primary" to="/player">here</nuxt-link>
                </div>
                <table class="table w-full">
                    <tbody class="w-full">
                        <draggable v-model="players" tag="tr" item-key="name">
                            <template #item="{ element: player }">
                                <tr class="hover w-full">
                                    <td class="flex items-center space-x-3 w-full">
                                        <div class="font-bold">{{ player.turnOrder }}</div>
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-12 h-12">
                                                <img :src="player.restaurant.img" format="webp"
                                                    :alt="player.restaurant.name" />
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="font-bold w-full">{{ player.name }}</div>
                                            <div class="text-sm opacity-50">{{ player.restaurant.name }}</div>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </draggable>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import draggable from 'vuedraggable';

const store = usePlayerStore();

let { players } = storeToRefs(store);
</script>

<style></style>