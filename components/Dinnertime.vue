<template>
    <div class="flex flex-col h-[calc(100vh-64px)] relative place-items-center">
        <h3 class="text-center my-5 text-5xl uppercase font-bold kansas">Dinnertime</h3>
        <div class="stats shadow bg-base-200">

            <!-- <div class="stat">
                <div class="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block w-8 h-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                        </path>
                    </svg>
                </div>
                <div class="stat-title">Total Likes</div>
                <div class="stat-value text-primary">25.6K</div>
                <div class="stat-desc">21% more than last month</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block w-8 h-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <div class="stat-title">Page Views</div>
                <div class="stat-value text-secondary">2.6M</div>
                <div class="stat-desc">21% more than last month</div>
            </div> -->
            <div class="stat">
                <div class="stat-title">Total amount this turn</div>
                <div class="stat-value">$200</div>
                <div class="stat-actions">
                    <button class="btn btn-md btn-primary">Start new</button>
                </div>
            </div>
            <div class="stat" v-for="player in players" :key="player.name">
                <div class="stat-figure text-secondary">
                    <div class="avatar">
                        <div class="w-16 rounded-full">
                            <img :src="player.restaurant.img" />
                        </div>
                    </div>
                </div>
                <span class="stat-value">{{ amount }} $</span>
                <div class="stat-title">{{ player.name }}</div>
                <div :class="['stat-desc', player.restaurant.color]">{{ player.restaurant.name }}</div>
                <div class="stat-desc">From January</div>
            </div>

        </div>
        <p id="title" class="font-bold uppercase divider mt-10 md:mx-[10%]">Select a house & set foods</p>
        <div class="">
            <ul class="steps steps-vertical lg:steps-horizontal">
                <li class="step" :data-content="h.id == 9.75 ? '9&frac34;' : h.name" v-for="h in housesWithNeeded"
                    :key="h.id">
                    <img v-if="h.garden" src="/img/house_garden.jpg" class="w-[40px]" />
                    <img v-if="h.apartment" src="/img/appartment.jpg" class="w-[45px]" />
                </li>
            </ul>
        </div>
        <div class="flex w-full justify-center fixed bottom-8">
            <NuxtLink to="/turn" class="">
                <button class="btn btn-outline mt-3">New turn</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';

const store = useMainStore();

let { players, housesWithNeeded } = storeToRefs(store);
let amount = ref(150);

onMounted(() => {
    // document.getElementById('title').scrollIntoView();
    // setInterval(() => {
    //     amount.value += Math.floor(Math.random() * 10);
    // }, 1000);
})
</script>

<style></style>