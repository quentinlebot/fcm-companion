<template>
    <div class="flex flex-col relative h-[calc(100vh-64px)]">
        <h3 class="text-center my-5 text-5xl uppercase font-bold kansas">At work</h3>
        <p id="title" class="font-bold uppercase divider md:mx-[10%]">Select player's active employees</p>
        <div class="flex justify-center h-100px gap-2">
            <div class="flex flex-col place-items-center" v-for="p in players" :key="p.name" @click="selectPlayer(p)">
                <img :src="p.restaurant.img" alt=""
                    :class="['rounded-full', p.name == selectedPlayer.name ? 'h-12 md:h-20' : 'grayscale opacity-50 h-8 w-8 md:h-16 md:w-16']" />
                <span :class="['text-xl', p.name == selectedPlayer.name ? 'text-primary' : '']">{{ p.name }}</span>
                <span class="opacity-50 text-xs md:text-lg" v-if="p.getNbrOfEmployee() > 0">{{ p.getNbrOfEmployee() }}
                    emp.</span>
            </div>
        </div>
        <div class="flex justify-center h-full mt-5">
            <div class="flex gap-2 md:gap-10 justify-center h-1/2 md:h-full place-items-center flex-wrap">
                <div class="flex flex-col justify-center place-items-center gap-2 w-[30vw] md:w-[12vw]">
                    <span class="text-center kansas">Clear</span>
                    <div class="btn-group btn-group-vertical lg:btn-group-horizontal">
                        <button class="btn btn-active" @click="selectedPlayer.resetEmployees()">This player</button>
                        <button class="btn" @click="resetAllEmployees()">all players</button>
                    </div>
                </div>
                <div class="indicator w-[30vw] md:w-[12vw]">
                    <span class="indicator-item badge badge-secondary md:text-xl md:w-8 md:h-8"
                        v-if="selectedPlayer.pricingManager">{{
                            selectedPlayer.pricingManager
                        }}</span>
                    <img class="cursor-pointer hover:opacity-90" src="/img/e_pricing_manager.jpg" format="webp" sizes="19vw"
                        @click="selectedPlayer.increaseNbrOfEmployee(Employee.PRICING_MANAGER)" />
                </div>
                <div class="indicator w-[30vw] md:w-[12vw]">
                    <span class="indicator-item badge badge-secondary md:text-xl md:w-8 md:h-8"
                        v-if="selectedPlayer.discountManager">{{
                            selectedPlayer.discountManager
                        }}</span>
                    <img class="cursor-pointer hover:opacity-90" src="/img/e_discount_manager.jpg" format="webp"
                        sizes="19vw" @click="selectedPlayer.increaseNbrOfEmployee(Employee.DISCOUNT_MANAGER)" />
                </div>
                <div class="indicator w-[30vw] md:w-[12vw]">
                    <span class="indicator-item badge badge-secondary md:text-xl md:w-8 md:h-8"
                        v-if="selectedPlayer.luxuriesManager">{{
                            selectedPlayer.luxuriesManager
                        }}</span>
                    <img class="cursor-pointer hover:opacity-90" src="/img/e_luxuries_manager.jpg" format="webp"
                        sizes="19vw" @click="selectedPlayer.increaseNbrOfEmployee(Employee.LUXURIES_MANAGER)" />
                </div>
                <div class="indicator w-[30vw] md:w-[12vw]">
                    <span class="indicator-item badge badge-secondary md:text-xl md:w-8 md:h-8" v-if="selectedPlayer.cfo">{{
                        selectedPlayer.cfo
                    }}</span>
                    <img class="cursor-pointer hover:opacity-90" src="/img/e_cfo.jpg" format="webp" sizes="19vw"
                        @click="selectedPlayer.increaseNbrOfEmployee(Employee.CFO)" />
                </div>
                <div class="indicator w-[30vw] md:w-[12vw]">
                    <span class="indicator-item badge badge-secondary md:text-xl md:w-8 md:h-8"
                        v-if="selectedPlayer.waitress">{{ selectedPlayer.waitress
                        }}</span>
                    <img class="cursor-pointer hover:opacity-90" src="/img/e_waitress.jpg" format="webp" sizes="19vw"
                        @click="selectedPlayer.increaseNbrOfEmployee(Employee.WAITRESS)" />
                </div>
            </div>
        </div>
        <div class="flex w-full justify-center fixed bottom-8">
            <NuxtLink to="/milestone" v-if="remainingMilestone()">
                <button class="btn btn-outline mt-3">Next</button>
            </NuxtLink>
            <NuxtLink to="/stock" v-if="!remainingMilestone()">
                <button class="btn btn-outline mt-3">Next</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';
import { Employee } from '~/types/player';

const store = useMainStore();

let { players } = storeToRefs(store);
let selectedPlayer = ref(players.value[0]);

onMounted(() => {
    document.getElementById('title').scrollIntoView();
})

const selectPlayer = (player) => {
    selectedPlayer.value = player;
};
const resetAllEmployees = () => {
    players.value.forEach(p => p.resetEmployees());
};
const hasMilestone = (player, milestone) => {
    switch (milestone) {
        case 'burger':
            return player.milestoneBurger;
        case 'pizza':
            return player.milestonePizza;
        case 'drink':
            return player.milestoneDrink;
        case 'price':
            return player.milestoneLowerPrice;
        default:
            return false;
    }
};
const remainingMilestone = () => {
    let milestones = ['burger', 'pizza', 'drink', 'price']
    for (let index = 0; index < milestones.length; index++) {
        const element = milestones[index];
        if (players.value.filter(p => hasMilestone(p, milestones[index])).length == 0)
            return true;
    }
    return false;
};
</script>

<style></style>