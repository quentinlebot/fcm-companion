<template>
    <div class="flex flex-col">
        <h3 class="text-center m-5 text-5xl uppercase font-bold kansas">Turn order</h3>
        <div class="flex justify-center">
            <div class="overflow-x-auto w-1/3">
                <p class="font-bold uppercase divider">List of players</p>
                <table class="table w-full">
                    <tbody>
                        <tr v-for="player in players" :key="player.name">
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div class="flex items-center space-x-3">
                                    <div class="avatar">
                                        <div class="mask mask-squircle w-12 h-12">
                                            <nuxt-img :src="player.restaurant.img" format="webp"
                                                :alt="player.restaurant.name" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">{{ player.name }}</div>
                                        <div class="text-sm opacity-50">{{ player.restaurant.name }}</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

const store = usePlayerStore();

let { players } = storeToRefs(store);
</script>

<style></style>