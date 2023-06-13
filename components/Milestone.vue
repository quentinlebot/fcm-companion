<template>
    <div class="flex flex-col h-[calc(100vh-64px)] relative">
        <h3 id="title" class="text-center my-5 text-5xl uppercase font-bold kansas">Milestones</h3>
        <p class="font-bold uppercase divider md:mx-[10%]">Awarded players</p>
        <div class="flex justify-center mt-5 md:h-[65vh] place-items-center">
            <div class="flex flex-col md:flex-row w-full md:flex-wrap md:gap-3 md:justify-center">
                <div @click="setCurrentMilestone(Milestone.BURGER)"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 text-sm md:text-xl ml-2 w-1/3">{{
                        Utils.getMilestoneDisplay(Milestone.BURGER) }}</span>
                    <div class="flex justify-center w-1/3">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none burger" src="/img/m_icon04.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 w-1/3 text-end mr-3">5$ for every burger sold</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3 border-x-[1px] rounded-xl">
                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.hasMilestone(Milestone.BURGER))" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                    <div v-if="players.filter(pl => pl.hasMilestone(Milestone.BURGER)).length == 0"
                        class="flex justify-center place-items-center underline">
                        <p>Nobody has scored this milestone yet</p>
                    </div>
                </div>
                <div @click="setCurrentMilestone(Milestone.PIZZA)"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">{{
                        Utils.getMilestoneDisplay(Milestone.PIZZA) }}</span>
                    <div class="flex justify-center w-1/3">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none pizza" src="/img/m_icon07.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-3">5$ for every pizza
                        sold</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3 border-x-[1px] rounded-xl">

                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.hasMilestone(Milestone.PIZZA))" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                    <div v-if="players.filter(pl => pl.hasMilestone(Milestone.PIZZA)).length == 0"
                        class="flex justify-center place-items-center underline">
                        <p>Nobody has scored this milestone yet</p>
                    </div>
                </div>
                <div @click="setCurrentMilestone(Milestone.DRINK)"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">{{
                        Utils.getMilestoneDisplay(Milestone.DRINK) }}</span>
                    <div class="flex justify-center w-1/3">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none drink" src="/img/m_icon10.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-3">5$ for every drink
                        sold</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3 border-x-[1px] rounded-xl">
                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.hasMilestone(Milestone.DRINK))" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                    <div v-if="players.filter(pl => pl.hasMilestone(Milestone.DRINK)).length == 0"
                        class="flex justify-center place-items-center underline">
                        <p>Nobody has scored this milestone yet</p>
                    </div>
                </div>
                <div @click="setCurrentMilestone(Milestone.LOWER_PRICE)"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] pink gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">{{
                        Utils.getMilestoneDisplay(Milestone.LOWER_PRICE) }}</span>
                    <div class="flex justify-center w-1/3 rounded border-1 border-neutral">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none sales" src="/img/m_icon23.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-3">Price -1$</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3 border-x-[1px] rounded-xl">
                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.hasMilestone(Milestone.LOWER_PRICE))" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                    <div v-if="players.filter(pl => pl.hasMilestone(Milestone.LOWER_PRICE)).length == 0"
                        class="flex justify-center place-items-center underline">
                        <p>Nobody has scored this milestone yet</p>
                    </div>
                </div>
                <div @click="setCurrentMilestone(Milestone.WAITRESS)"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] pink gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">{{
                        Utils.getMilestoneDisplay(Milestone.WAITRESS) }}</span>
                    <div class="flex justify-center w-1/3 rounded border-1 border-neutral">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none waitress" src="/img/m_icon16.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-3">Each waitress +2$</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3 border-x-[1px] rounded-xl">
                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.hasMilestone(Milestone.WAITRESS))" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                    <div v-if="players.filter(pl => pl.hasMilestone(Milestone.WAITRESS)).length == 0"
                        class="flex justify-center place-items-center underline">
                        <p>Nobody has scored this milestone yet</p>
                    </div>
                </div>
                <div @click="setCurrentMilestone(Milestone.KETCHUP)"
                    class="flex justify-center place-items-center h-[70px] md:h-[100px] bg-zinc-500 gap-5 md:rounded-box md:w-1/3 cursor-pointer">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">{{
                        Utils.getMilestoneDisplay(Milestone.KETCHUP) }}</span>
                    <div class="flex justify-center w-1/3 rounded border-1 border-neutral">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none ketchup" src="/img/m_icon30.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-3">Distance -1</span>
                </div>
                <div class="flex justify-center h-100px gap-2 my-2 md:w-1/3 border-x-[1px] rounded-xl">
                    <div class="flex justify-center place-items-center flex-row md:flex-col text-center"
                        v-for="p in players.filter(pl => pl.hasMilestone(Milestone.KETCHUP))" :key="p.name">
                        <img :src="p.restaurant.img" alt="" :class="['h-5 w-5', 'md:h-14 md:w-14', 'rounded-full']" />
                        <span :class="['text-sm md:text-xl']">{{ p.name }}</span>
                    </div>
                    <div v-if="players.filter(pl => pl.hasMilestone(Milestone.KETCHUP)).length == 0"
                        class="flex justify-center place-items-center underline">
                        <p>Nobody has scored this milestone yet</p>
                    </div>
                </div>
            </div>
        </div>
        <input type="checkbox" id="cb_milestone" class="modal-toggle" v-model="modal" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg text-center">Select players who score milestone :</h3>
                <p class="w-full italic text-center">{{
                    Utils.getMilestoneDisplay(selectedMilestone)
                }}</p>
                <div class="flex justify-center h-100px gap-2 my-3">
                    <div class="flex flex-col justify-center place-items-center text-center" v-for="p in players"
                        @click="tooglePlayer(p)" :key="p.name">
                        <img :src="p.restaurant.img" alt=""
                            :class="['h-8 w-8', 'md:w-12 md:h-12', 'rounded-full', selectedPlayers.includes(p) ? '' : 'grayscale opacity-50']" />
                        <span :class="['text-xl', selectedPlayers.includes(p) ? 'text-primary' : '']">{{ p.name
                        }}</span>
                    </div>
                </div>
                <div class="modal-action flex justify-center">
                    <label class="btn btn-primary" for="cb_milestone" @click="setMilestones()">Done</label>
                    <label class="btn btn-outline" for="cb_milestone">Cancel</label>
                </div>
            </div>
        </div>
        <div class="flex w-full justify-center pb-8 md:pb-0 md:fixed md:bottom-8">
            <NuxtLink to="/stock" class="">
                <button class="btn btn-outline mt-3">Next</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';
import { Milestone } from '~/types/player';
import { Utils } from '~/types/utils';

const store = useMainStore();

let { players } = storeToRefs(store);
let modal = ref(false);
let selectedMilestone = ref(Milestone.BURGER);
let selectedPlayers = ref([]);

onMounted(() => {
    document.getElementById('title').scrollIntoView();
})

const setCurrentMilestone = (m) => {
    selectedMilestone.value = m;
    selectedPlayers.value = [];
    modal.value = true;
}
const setMilestones = () => {
    players.value.forEach(p => {
        p.setMilestone(selectedMilestone.value, selectedPlayers.value.includes(p))
    });
}
const tooglePlayer = (player) => {
    if (selectedPlayers.value.includes(player)) {
        selectedPlayers.value = selectedPlayers.value.filter(p => p !== player);
    } else {
        selectedPlayers.value.push(player);
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

.waitress {
    width: 65px;
}

.sales {
    width: 80px;
    margin-top: -5px;
    margin-left: 5px;
}

.ketchup {
    width: 62px;
}
</style>