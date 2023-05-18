<script setup lang="ts">
import { usePlayer } from '@/models/player';
import type { Player } from '@/types/player';

const props = defineProps<{
  player: Player,
  last: boolean,
  lastUntickable: boolean,
}>()
const price = computed(() => props.player.getUnitPrice())
const burgerPrice = computed(() => props.player.getBurgerSellingPrice())
const pizzaPrice = computed(() => props.player.getPizzaSellingPrice())
const drinkPrice = computed(() => props.player.getDrinkSellingPrice())
let newTurnOrder = ref(null);

function setTurnOrder() {
  if (newTurnOrder.value !== null) {
    usePlayer().setTurnOrder(props.player.id, props.player.turnOrder, parseInt(newTurnOrder.value));
    newTurnOrder = ref(null);
  }
}
</script>

<template>
  <tr v-if="!player.hide">
    <td><input v-if="last" type="checkbox" v-model="player.hide" /></td>
    <td>
      <input v-model="player.name" />
    </td>
    <td>
      <input type="checkbox" v-model="player.milestoneBurger" />
    </td>
    <td>
      <input type="checkbox" v-model="player.milestonePizza" />
    </td>
    <td>
      <input type="checkbox" v-model="player.milestoneDrink" />
    </td>
    <td>
      <input type="checkbox" v-model="player.milestoneLowerPrice" />
    </td>
    <td>
      <button :disabled="player.pricingManager < 1" v-on:click="player.pricingManager--">-</button>
      {{ player.pricingManager }}
      <button v-on:click="player.pricingManager++">+</button>
    </td>
    <td>
      <button :disabled="player.discountManager < 1" v-on:click="player.discountManager--">-</button>
      {{ player.discountManager }}
      <button v-on:click="player.discountManager++">+</button>
    </td>
    <td>
      <button :disabled="player.luxuryManager < 1" v-on:click="player.luxuryManager--">-</button>
      {{ player.luxuryManager }}
      <button v-on:click="player.luxuryManager++">+</button>
    </td>
    <td>
      <button :disabled="player.waitress < 1" v-on:click="player.waitress--">-</button>
      {{ player.waitress }}
      <button v-on:click="player.waitress++">+</button>
    </td>
    <td>
      <button :disabled="player.cfo < 1" v-on:click="player.cfo--">-</button>
      {{ player.cfo }}
      <button :disabled="player.cfo > 0" v-on:click="player.cfo++">+</button>
    </td>
    <td>
      {{ price }}
    </td>
    <td>
      {{ burgerPrice }}
    </td>
    <td>
      {{ pizzaPrice }}
    </td>
    <td>
      {{ drinkPrice }}
    </td>
    <td>
      {{ player.turnOrder }}
      <input placeholder="new value" v-model="newTurnOrder" @change="setTurnOrder()" />
    </td>
  </tr>
  <tr v-if="player.hide">
    <td><input v-if="!lastUntickable" type="checkbox" v-model="player.hide" /></td>
  </tr>
</template>

<style scoped>
td {
  text-align: center;
}

input {
  width: 100%;
}
</style>
