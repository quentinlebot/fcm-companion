<template>
    <div class="flex flex-col w-screen place-items-center">
        <h3 class="text-center mt-5 w-2/3 text-5xl uppercase font-bold kansas">Players & restaurants</h3>
        <div class="mt-5 w-1/3">
            <div class="flex relative">
                <p>Select your restaurant</p>
                <p class="text-primary absolute right-0">{{ selectedRestaurant.name }}</p>
            </div>
            <div class="p-3 carousel h-20 space-x-2 bg-neutral rounded-box justify-center">
                <div v-for="restaurant in restaurants" :key="restaurant.name" :class="['carousel-item', 'cursor-pointer']"
                    @click="selectRestaurant(restaurant)">
                    <img :src="restaurant.img"
                        :class="['rounded-box', restaurant.disabled ? 'grayscale opacity-60' : '', selectedRestaurant.name === restaurant.name ? 'border-2 border-primary' : '']" />
                </div>
            </div>
            <p class="mt-5">Enter your name</p>
            <div class="form-control">
                <input autofocus type="text" placeholder="" class="input input-primary w-full" v-model="inputName"
                    @keydown="onEnterPress" tabindex="0" />
                <label class="label">
                    <span class="label-text-alt"></span>
                    <span :class="['label-text-alt', 'text-red-400', inputError ? 'visible' : 'invisible']">Name already
                        taken</span>
                </label>
            </div>
        </div>
        <div class="w-1/3 flex justify-center">
            <button class="btn w-40" @click="newPlayer"
                :disabled="!inputName || inputError || !selectedRestaurant.name">Add</button>
        </div>

        <div class="w-1/3" v-if="players.length > 0">
            <p class="font-bold uppercase divider">List of players</p>
            <div class="flex flex-col">
                <div v-for="player in players" :key="player.name" class="mt-1 flex group/item">
                    <div class="flex justify-between w-full">
                        <div class="avatar">
                            <div class="w-10 rounded">
                                <img :src="player.restaurant.img" />
                            </div>
                        </div>
                        <div class="">{{ player.name }}</div>
                        <button class="btn btn-xs btn-square invisible group-hover/item:visible"
                            @click="deletePlayer(player.name)">
                            <Icon name="fa6-solid:xmark" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
let players = ref([]);
let inputName = ref('');
let inputError = ref(false);
let restaurants = ref([
    {
        name: 'Duck Dinner',
        img: '/img/p_duck_dinner.jpg',
        disabled: false,
    },
    {
        name: 'Gluttony Inc',
        img: '/img/p_gluttony_inc.jpg',
        disabled: false,
    },
    {
        name: 'Fried Geese',
        img: '/img/p_fried_geese.jpg',
        disabled: false,
    },
    {
        name: 'Santa Maria',
        img: '/img/p_santa_maria.jpg',
        disabled: false,
    },
    {
        name: 'Xango Blues',
        img: '/img/p_xango_blues.jpg',
        disabled: false,
    },
    {
        name: 'Siap Faji',
        img: '/img/p_siap_faji.jpg',
        disabled: false,
    }
]);
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

const newPlayer = () => {
    if (inputName.value == '' || !selectedRestaurant.value.name) return;
    players.value.push({
        name: inputName.value,
        restaurant: {
            name: selectedRestaurant.value.name,
            img: selectedRestaurant.value.img,
        }
    });
    selectedRestaurant.value.disabled = true;
    inputName.value = '';
    selectNext();
}
const deletePlayer = (name) => {
    const player = players.value.find(p => p.name == name);
    if (!player) return;
    const restaurant = restaurants.value.find(r => r.name == player.restaurant.name);
    if (!restaurant) return;
    restaurant.disabled = false;
    players.value = players.value.filter(p => p.name != name);
    selectNext();
}

watch(() => inputName.value, (value) => {
    if (value == '') {
        inputError.value = false;
        return;
    }
    const player = players.value.find(p => p.name == value);
    if (player) {
        inputError.value = true;
        return;
    }
    inputError.value = false;
});
</script>

<style></style>