<template>
    <div class="flex flex-col w-screen place-items-center">
        <h3 class="text-center mt-5 text-5xl uppercase font-bold kansas">Players & restaurants</h3>

        <div id="title" class="md:w-auto m-2 relative md:mt-10">
            <p class="font-bold uppercase divider">Add new player to your game</p>
            <div class="flex md:mt-10">
                <p>Select your restaurant</p>
            </div>
            <div class="carousel h-12 md:h-20 gap-1 flex justify-center">
                <div v-for="restaurant in restaurants" :key="restaurant.name" :class="['carousel-item', 'cursor-pointer']"
                    @click="selectRestaurant(restaurant)">
                    <img :src="restaurant.img" format="webp" :alt="restaurant.name"
                        :class="['rounded-box', restaurant.disabled ? 'grayscale opacity-60' : '', selectedRestaurant.name === restaurant.name ? 'border-2 border-primary' : '']" />
                </div>
            </div>
            <p class="text-primary absolute right-0">{{ selectedRestaurant.name }}</p>
            <p class="mt-5  md:mt-10">Enter your name</p>
            <div class="form-control">
                <input type="text" placeholder="" class="input input-primary w-full" v-model="inputName"
                    @keydown.enter="onEnterPress" @change="verfiyName" @input="scrollToVIew" tabindex="0" />
                <label class="label">
                    <span class="label-text-alt"></span>
                    <span :class="['label-text-alt', 'text-red-400', inputError ? 'visible' : 'invisible']">Name already
                        taken</span>
                </label>
            </div>

            <div class="flex flex-row justify-center">
                <button class="btn w-40" @click="newPlayer"
                    :disabled="!inputName || inputError || !selectedRestaurant.name">Add</button>
            </div>
        </div>

        <div class="md:w-1/3 mt-2 md:mt-10 justify-center" v-if="players.length > 0">
            <p class="font-bold uppercase divider">List of players</p>
            <div class="flex w-full flex-wrap gap-2 justify-center">
                <div v-for="player in players" :key="player.name" class="badge" @click="deletePlayer(player.name)">
                    <div class="avatar w-4 h-4">
                        <div class="rounded">
                            <img :src="player.restaurant.img" format="webp" :alt="player.restaurant.name" />
                        </div>
                    </div>
                    <div class="mx-2">{{ player.name }}</div>
                    <Icon name="fa6-solid:xmark" />
                </div>
            </div>
            <div class="flex w-full justify-center">
                <NuxtLink to="/turn" class="">
                    <button class="btn btn-outline mt-3" :disabled="players.length < 2">Next</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

const store = usePlayerStore();

let { players, restaurants } = storeToRefs(store);
let inputName = ref('');
let inputError = ref(false);
let selectedRestaurant = ref(restaurants.value[0]);

function selectRestaurant(restaurant) {
    if (restaurant.disabled) return;
    selectedRestaurant.value = restaurant;
}
function selectNext() {
    for (let index = 0; index < restaurants.value.length; index++) {
        const element = restaurants.value[index];
        if (!element.disabled) {
            selectedRestaurant.value = element;
            return;
        }
    }
    selectedRestaurant.value = {
        name: '',
        img: '',
    };
}
function onEnterPress(event) {
    if (event.key === 'Enter') {
        newPlayer();
    }
}
function verfiyName() {
    const name = inputName.value;
    if (name == '') {
        inputError.value = false;
        return;
    }
    const player = players.value.find(p => p.name == name);
    if (player) {
        inputError.value = true;
        return;
    }
    inputError.value = false;
}
function scrollToVIew() {
    document.getElementById('title').scrollIntoView();
}

const newPlayer = () => {
    if (inputName.value == '' || !selectedRestaurant.value.name) return;

    store.newPlayer({
        name: inputName.value,
        restaurant_id: selectedRestaurant.value.id,
    });
    inputName.value = '';
    selectNext();
}
const deletePlayer = (name) => {
    store.deletePlayer(name);
    selectNext();
}

watch(() => inputName.value, (value) => {
    verfiyName(value);
});
</script>

<style></style>