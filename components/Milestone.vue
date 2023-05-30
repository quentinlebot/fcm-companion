<template>
    <div class="flex flex-col h-[calc(100vh-64px)] relative">
        <h3 id="title" class="text-center my-5 text-5xl uppercase font-bold kansas">Milestones</h3>
        <p class="font-bold uppercase divider md:mx-[10%]">Awarded card by players</p>
        <div class="flex justify-center mt-5 md:h-[60vh] place-items-center">
            <div class="flex flex-col md:flex-row w-full md:flex-wrap md:gap-10 md:justify-center">
                <div @click="setCurrentMilestone('burger')"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 text-sm md:text-xl ml-2 w-1/3">First burger
                        marketed</span>
                    <div class="flex justify-center w-1/3">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none burger" src="/img/m_icon04.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 w-1/3 text-end mr-2">5$ for every burger sold</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3">
                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.milestoneBurger)" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                </div>
                <div @click="setCurrentMilestone('pizza')"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">First pizza
                        marketed</span>
                    <div class="flex justify-center w-1/3">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none pizza" src="/img/m_icon07.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-2">5$ for every pizza
                        sold</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3">

                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.milestonePizza)" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                </div>
                <div @click="setCurrentMilestone('drink')"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">First drink
                        marketed</span>
                    <div class="flex justify-center w-1/3">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none drink" src="/img/m_icon10.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-2">5$ for every drink
                        sold</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3">
                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.milestoneDrink)" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                </div>
                <div @click="setCurrentMilestone('price')"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] pink gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">First to lower
                        prices</span>
                    <div class="flex justify-center w-1/3 rounded border-1 border-neutral">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none sales" src="/img/m_icon23.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-2">Price -1$</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3">
                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.milestoneLowerPrice)" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <input type="checkbox" id="cb_milestone" class="modal-toggle" v-model="modal" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Select players who score milestone "{{ selectedMilestone }}"</h3>
                <div class="flex justify-center h-100px gap-2 my-2">
                    <div class="flex flex-col justify-center place-items-center text-center" v-for="p in players"
                        @click="setMilestone(p)" :key="p.name">
                        <img :src="p.restaurant.img" alt=""
                            :class="['h-8 w-8', 'md:w-12 md:h-12', 'rounded-full', hasMilestone(p) ? '' : 'grayscale opacity-50']" />
                        <span :class="['text-xl', hasMilestone(p) ? 'text-primary' : '']">{{ p.name
                        }}</span>
                    </div>
                </div>
                <div class="modal-action flex justify-center">
                    <label class="btn btn-primary" for="cb_milestone">Done</label>
                </div>
            </div>
        </div>
        <div class="flex w-full justify-center fixed bottom-5">
            <NuxtLink to="/dinnertime" class="">
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
let modal = ref(false);
let selectedMilestone = ref('burger');

onMounted(() => {
    document.getElementById('title').scrollIntoView();
})

const setCurrentMilestone = (m) => {
    selectedMilestone.value = m;
    modal.value = true;
}
const setMilestone = (player, milestone) => {
    if (!milestone)
        milestone = selectedMilestone.value;
    if (!player) return
    switch (milestone) {
        case 'burger':
            player.milestoneBurger = !player.milestoneBurger;
            break;
        case 'pizza':
            player.milestonePizza = !player.milestonePizza;
            break;
        case 'drink':
            player.milestoneDrink = !player.milestoneDrink;
            break;
        case 'price':
            player.milestoneLowerPrice = !player.milestoneLowerPrice;
            break;
        default:
            break;
    }
}
const hasMilestone = (player, milestone) => {
    if (!milestone)
        milestone = selectedMilestone.value;
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
}
</script>

<style>
.column {
    flex: 1 1 0px;
}

.square {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.blue {
    background-color: #87c2c7;
}

.pink {
    background-color: #f8a48c;
}

.star {
    color: #fef0d3;
    font-size: 1.5rem;
}

.circle {
    width: 50px;
    height: 50px;
    background-color: #fef0d3;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.burger {
    width: 80px;
    margin-top: -5px;
    margin-left: -5px;
}

.pizza {
    width: 50px;
    margin-top: -18px;
    margin-left: 5px;
}

.drink {
    width: 50px;
    margin-top: -5px;
    margin-left: 5px;
}

.sales {
    width: 80px;
    margin-top: -5px;
    margin-left: 5px;
}
</style>