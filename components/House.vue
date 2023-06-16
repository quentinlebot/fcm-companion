<template>
    <div class="flex flex-col">
        <h3 class="text-center m-5 text-5xl uppercase font-bold kansas">Houses & marketing</h3>
        <p id="title" class="font-bold uppercase divider md:mx-[10%]">Select house & set needs</p>
        <div class="italic mt-2 md:mt-20 text-center" v-if="players.length < 1">
            Start with adding players
            <nuxt-link class="link link-primary" to="/player">here</nuxt-link>
        </div>
        <div v-if="players.length > 1">
            <div class="flex justify-center md:m-5">
                <div class="flex flex-col justify-center min-h-[200px]">
                    <div class="bg-house h-[108px] md:h-[100px] flex flex-col justify-end"
                        v-if="!selected.ruralArea & !selected.apartment & !selected.gardenReadOnly">
                        <img src="/img/house.jpg" :class="['w-[100px]', selected ? '' : 'grayscale opacity-50']" />
                    </div>
                    <img src="/img/garden.jpg"
                        :class="['w-[100px]', 'pt-1', 'cursor-pointer', selected.garden ? '' : 'grayscale opacity-50']"
                        v-if="!selected.gardenReadOnly & !selected.apartment & !selected.ruralArea"
                        @click="selected.setGarden()" />
                    <div class="bg-house h-[145px] flex flex-col justify-end" v-if="selected.gardenReadOnly">
                        <img src="/img/house_garden.jpg" class="w-[100px]" />
                    </div>
                    <div class="bg-house h-[145px] flex flex-col justify-center" v-if="selected.apartment">
                        <img src="/img/apartment.png" class="w-[100px]" />
                    </div>
                    <div class="h-[174px] flex flex-col justify-center" v-if="selected.ruralArea">
                        <img src="/img/rural_area.jpg" class="w-[100px]" />
                    </div>
                    <div :class="['bg-park mt-1', selected.park ? '' : 'grayscale opacity-50']" v-if="!selected.ruralArea">
                        <img src="/img/park.png"
                            :class="['w-[100px]', 'cursor-pointer', selected.park ? '' : 'grayscale opacity-50']"
                            @click="selected.setPark()" />
                    </div>
                </div>
                <div class="flex flex-col justify-between place-items-center">
                    <div class="text-center underline decoration-primary">
                        <h4>House</h4>
                    </div>
                    <div class="flex justify-center place-items-center">
                        <button class="btn btn-ghost btn-sm md:btn-md" @click="previous()">
                            <Icon name="fa6-solid:caret-up" />
                        </button>
                        <select class="select select-bordered select-sm md:select-md" v-model="selected">
                            <option v-for="h in houses" :value="h"
                                :class="[h.getNbrOfNeeds() == 0 ? 'text-gray-500' : 'font-bold']">{{ (h.id
                                    ==
                                    9.75 ? '9&frac34;' : (isNaN(h.id) ? '&#8734;' : h.name)) + (h.getNbrOfNeeds() ? '&#x1F3F4;'
                                        :
                                        '') }}
                            </option>
                        </select>
                        <button class="btn btn-ghost btn-sm md:btn-md rounded-r-lg mr-5" @click="next()">
                            <Icon name="fa6-solid:caret-down" />
                        </button>
                        <button :disabled="selected.getNbrOfNeeds() == 0" class="btn btn-sm md:btn-md btn-ghost"
                            @click="selected.resetNeeds()">
                            <Icon name="fa6-solid:trash" class="mr-2" />needs
                        </button>
                    </div>
                    <div class="flex justify-center relative w-full">
                        <h4 class="underline decoration-primary">Food & drinks</h4>
                        <span v-if="selected.maxNeedReached()" class="absolute right-2 badge badge-error">max</span>
                    </div>
                    <div class="flex mr-5">
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary" v-if="selected.getNeed(Product.BURGER)">{{
                                selected.getNeed(Product.BURGER)
                            }}</span>
                            <svg width="55px" viewBox="85 130 40 40"
                                :class="['cursor-pointer', selected.getNeed(Product.BURGER) ? '' : 'opacity-30']"
                                @click="selected.increaseNeed(Product.BURGER)">
                                <path style="fill:#996b2b;fill-opacity:1;stroke-width:0.35277781"
                                    d="m 94.881436,158.67264 c -2.00293,-0.47455 -3.60153,-2.56073 -3.60153,-4.70003 0,-0.55139 -0.30247,-0.97447 -0.88714,-1.24086 -1.9137,-0.87194 -1.90238,-4.02429 0.0162,-4.50583 0.58003,-0.14557 0.8689,-0.54972 1.03829,-1.45262 0.50599,-2.69716 3.44804,-5.9041 6.76027,-7.36892 5.610364,-2.48117 12.916744,-1.54933 17.036724,2.17283 1.6343,1.47648 3.01313,3.6488 3.35203,5.28102 0.12952,0.62376 0.5465,1.21031 1.00317,1.41111 1.85658,0.81636 1.93229,3.6204 0.12005,4.44611 -0.65645,0.2991 -0.91174,0.76703 -1.09872,2.0139 -0.30465,2.03152 -1.95469,3.73136 -3.94055,4.05948 -1.89992,0.31391 -18.391934,0.21713 -19.798784,-0.11619 z" />
                            </svg>
                        </div>
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary" v-if="selected.getNeed(Product.PIZZA)">{{
                                selected.getNeed(Product.PIZZA)
                            }}</span>
                            <svg width="55px" viewBox="85 130 40 40"
                                :class="['cursor-pointer', selected.getNeed(Product.PIZZA) ? '' : 'opacity-30']"
                                @click="selected.increaseNeed(Product.PIZZA)">
                                <path style="fill:#ee7500;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 94.715023,163.07584 c -1.04163,-0.73705 -3.38376,-4.53368 -4.27721,-6.93342 -1.60405,-4.30839 -1.70374,-10.035 -0.24926,-14.31905 1.38702,-4.08536 4.24605,-8.22208 5.6806,-8.21923 1.08499,0.002 2.92144,1.32182 3.15952,2.27043 0.23167,0.92304 0.72683,1.21195 13.379377,7.80623 6.63751,3.45935 8.38111,4.4761 8.42884,4.91515 0.0387,0.35607 -1.76133,1.37266 -10.72189,6.05523 -9.99893,5.22519 -10.852627,5.73487 -11.072357,6.61035 -0.40102,1.5978 -3.05886,2.71206 -4.32762,1.81431 z" />
                            </svg>
                        </div>
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary" v-if="selected.getNeed(Product.BEER)">{{
                                selected.getNeed(Product.BEER)
                            }}</span>
                            <svg width="55px" viewBox="85 130 40 40"
                                :class="['cursor-pointer', selected.getNeed(Product.BEER) ? '' : 'opacity-30']"
                                @click="selected.increaseNeed(Product.BEER)">
                                <path style="fill:#004c35;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 98.846396,165.35484 c -0.460309,-0.65718 -0.549171,-2.16526 -0.549171,-9.31997 v -8.53592 l 1.430098,-2.76267 c 1.631287,-3.15132 2.270807,-6.42753 1.921387,-9.84308 -0.14163,-1.3845 -0.0668,-2.47567 0.21162,-3.0868 l 0.4307,-0.94529 h 2.73109 2.73109 l 0.39602,1.13602 c 0.23249,0.66694 0.30397,1.94963 0.17309,3.10643 -0.36001,3.18203 0.38551,6.84711 1.98607,9.76385 l 1.39439,2.54102 v 8.78139 8.78138 l -0.64514,0.58385 c -0.54232,0.4908 -1.52298,0.58384 -6.15361,0.58384 h -5.508464 z" />
                            </svg>
                        </div>
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary" v-if="selected.getNeed(Product.COKE)">{{
                                selected.getNeed(Product.COKE)
                            }}</span>
                            <svg width="55px" viewBox="85 130 40 40"
                                :class="['cursor-pointer', selected.getNeed(Product.COKE) ? '' : 'opacity-30']"
                                @click="selected.increaseNeed(Product.COKE)">
                                <path style="fill:#a80a0f;fill-opacity:1;stroke-width:0.35277775"
                                    d="m 99.292292,165.21592 c -0.81956,-0.81955 -0.88577,-1.08563 -0.68031,-2.73403 0.12518,-1.00436 0.4897,-2.87031 0.81003,-4.14656 0.54287,-2.16284 0.54218,-2.48633 -0.0101,-4.7625 -0.84185,-3.46937 -0.75583,-6.25591 0.29221,-9.46649 0.485608,-1.48762 1.109118,-3.0557 1.385588,-3.48461 0.77237,-1.19826 1.34149,-5.07792 1.07796,-7.34849 l -0.23565,-2.03039 1.28884,-0.24179 c 1.68504,-0.31612 4.43465,0.004 4.77572,0.55569 0.14778,0.2391 0.1288,0.94135 -0.0422,1.56055 -0.42656,1.54489 0.14785,5.7454 1.01925,7.45349 2.14789,4.2102 2.74195,8.89622 1.66215,13.1111 -0.54444,2.12518 -0.53609,2.23592 0.55281,7.32667 0.5083,2.37632 0.38897,3.32706 -0.53334,4.24937 -0.83441,0.83441 -1.04032,0.8659 -5.66048,0.8659 -4.68041,0 -4.81619,-0.0216 -5.702478,-0.90791 z" />
                            </svg>
                        </div>
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary" v-if="selected.getNeed(Product.JUICE)">{{
                                selected.getNeed(Product.JUICE)
                            }}</span>
                            <svg width="55px" viewBox="85 130 40 40"
                                :class="['cursor-pointer', selected.getNeed(Product.JUICE) ? '' : 'opacity-30']"
                                @click="selected.increaseNeed(Product.JUICE)">
                                <path style="fill:#ffc700;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 97.967385,163.82875 c -0.1866,-0.24255 -0.52983,-2.26661 -0.762734,-4.49793 -0.232903,-2.23132 -0.566995,-5.24757 -0.742426,-6.70278 -0.175432,-1.45521 -0.49624,-4.31271 -0.712906,-6.35 -0.216666,-2.03729 -0.514718,-4.69297 -0.662337,-5.90152 -0.169603,-1.38852 -0.135779,-2.32997 0.09189,-2.55764 0.208734,-0.20873 2.315367,-0.36028 5.008128,-0.36028 h 4.64785 l 0.21625,-1.08123 c 0.2939,-1.4695 1.92443,-3.01263 3.68386,-3.4864 3.48115,-0.93737 6.90929,2.37898 6.18787,5.98609 -0.26718,1.3359 -2.62073,3.8732 -3.59271,3.8732 -0.55929,0 -0.7077,0.49738 -1.07895,3.61598 -0.70447,5.9176 -1.02029,8.68623 -1.47888,12.96458 -0.23918,2.23132 -0.58754,4.25538 -0.77414,4.49793 -0.24122,0.31352 -1.69062,0.44096 -5.01538,0.44096 -3.324757,0 -4.774157,-0.12744 -5.015383,-0.44096 z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <p class="font-bold uppercase divider md:mx-[10%]">Set distances</p>
            <div class="flex gap-5 justify-center -mt-3 md:m-5">
                <div class="flex flex-col" v-for="p, i in players" :key="p.name">
                    <div class="form-control">
                        <label class="label flex flex-wrap">
                            <span class="label-text">
                                <img :src="p.restaurant.img" alt="" :class="['rounded-full', 'h-8 w-8']" />
                            </span>
                            <span :class="['label-text-alt', p.restaurant.color]">{{ p.restaurant.name }}</span>
                        </label>
                        <input type="number"
                            :class="['input input-bordered w-full max-w-xs input-xs md:input-md', !dist[i] ? 'input-primary' : '']"
                            v-model="dist[i]" @change="p.setDistanceTo(selected.id, dist[i])" />
                        <label class="label">
                            <span class="label-text-alt"></span>
                            <span class="label-text-alt">{{ p.name }}</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center fixed bottom-8">
                <NuxtLink to="/dinnertime" class="">
                    <button class="btn btn-outline mt-3">Next</button>
                </NuxtLink>
            </div>

        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/main';
import { Product } from '~/types/types';
const route = useRoute();
const store = useMainStore();

let { players, houses } = storeToRefs(store);
let index = ref(0);
let selected = ref(houses.value[index.value]);
let dist = ref([]);

onMounted(() => {
    if (route.params.id) {
        selected.value = houses.value.find(h => h.id == route.params.id);
    }
    updateDistance();
})
watch(selected, () => {
    updateDistance();
})

const next = () => {
    index.value++;
    if (index.value >= houses.value.length) {
        index.value = 0;
    }
    selected.value = houses.value[index.value];
}
const previous = () => {
    index.value--;
    if (index.value < 0) {
        index.value = houses.value.length - 1;
    }
    selected.value = houses.value[index.value];
}
const updateDistance = () => {
    dist.value = [];
    players.value.forEach(p => {
        dist.value.push(p.getDistanceTo(selected.value.id));
    });
}
</script>

<style scoped>
.bg-park {
    background-color: #5d914f;
}

.bg-house {
    background-color: #772549;
}

svg:disabled {
    fill: #9ca3af;
}
</style>