<template>
    <div class="flex flex-col h-[calc(100vh-64px)] relative">
        <h3 class="text-center my-5 text-5xl uppercase font-bold kansas">Milestones</h3>
        <p class="font-bold uppercase divider md:mx-[10%]">Update unlock per player</p>
        <div class="flex justify-center">
            <div class="flex flex-col w-full md:w-1/3">
                <div class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box">
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
                <div class="h-[50px]">
                </div>
                <div class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box">
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
                <div class="h-[50px]">
                </div>
                <div class="flex justify-center place-items-center h-[70px] md:h-[100px] blue gap-5 md:rounded-box">
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
                <div class="h-[50px]">
                </div>
                <div class="flex justify-center place-items-center h-[70px] md:h-[100px] pink gap-5 md:rounded-box">
                    <span class="kansas text-gray-800 md:w-[250px] text-sm md:text-xl ml-2 w-1/3">First to lower
                        prices</span>
                    <div class="flex justify-center w-1/3">
                        <span class="star mr-5">★</span>
                        <div class="circle">
                            <img class="overflow-visible max-w-none sales" src="/img/m_icon23.png" format="webp" />
                        </div>
                        <span class="star ml-5">★</span>
                    </div>
                    <span class="kansas text-sm text-gray-800 md:w-[250px] w-1/3 text-end mr-2">Price -1$</span>
                </div>
            </div>
        </div>
        <div class="flex w-full justify-center fixed bottom-5">
            <NuxtLink to="/dinnertime" class="">
                <button class="btn btn-outline mt-3" :disabled="players.length < 2">Next</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/stores/main';

const store = useMainStore();

let { players } = storeToRefs(store);
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