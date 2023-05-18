<script setup lang="ts">
import { usePlayer } from '@/models/player';
import type { House } from '@/types/house';

const props = defineProps<{
  house: House,
}>()

const show = ref(false);
const selectedUser = ref(props.house.getPlayersFromRules()[0]);
let foods = ref("0 burg, 0 pizz, 0 coke, 0 limo, 0 beer, 0 sush, 0 nood, 0 kimc");

function calcEarn() {
  let res = 0;
  if (foods.value !== null) {
    let firstPlayer = selectedUser.value;
    let firstPlayerData = usePlayer().getPlayerById(firstPlayer.id);
    let items = foods.value.split(', ');
    items.forEach(item => {
      let [quantity, name] = item.split(' ');
      const qty = parseInt(quantity);
      if (name == 'burg' && firstPlayerData)
        res += qty * firstPlayerData.getBurgerSellingPrice(props.house.getMultiplier());
      else if (name == 'pizz' && firstPlayerData)
        res += qty * firstPlayerData.getPizzaSellingPrice(props.house.getMultiplier());
      else if (['coke', 'limo', 'beer'].includes(name) && firstPlayerData)
        res += qty * firstPlayerData.getDrinkSellingPrice(props.house.getMultiplier());
      else if (['sush', 'nood', 'kimc'].includes(name) && firstPlayerData)
        res += qty * firstPlayerData.getUnitPrice(props.house.getMultiplier());
    });
    if (firstPlayerData)
      res *= firstPlayerData.cfo ? 1.5 : 1;
    return res;
  }
}
</script>

<template>
  <tr>
    <td>
      <div><input type="checkbox" v-model="show" /></div>
    </td>
    <td>{{ house.name }}</td>
    <td>
      <div><input type="checkbox" v-bind:disabled="house.gardenReadOnly" v-model="house.garden" /></div>
    </td>
    <td>
      <div><input type="checkbox" v-model="house.park" /></div>
    </td>
    <td v-for="player in house.distPlayer.filter(player => !usePlayer().getPlayerById(player.id)?.hide)">
      <input v-model="player.dist" class="dist" v-if="show" />
    </td>
    <td>{{ house.getMultiplier() }}</td>
    <td>
      <span :class="['player', { active: selectedUser.id == housePlayer.id }, 'clickable']" v-if="show"
        v-for="housePlayer in house.getPlayersFromRules()" @click="selectedUser = housePlayer">
        {{ house.getPlayerValue(housePlayer) }}
      </span>
    </td>
    <td>
      <input v-if="show" class="food" v-model="foods" />
    </td>
    <td>
      <span v-if="show" class="earn">
        {{ calcEarn() }}$
      </span>
    </td>
  </tr>
</template>

<style scoped>
td {
  text-align: center;
}

td span.clickable {
  cursor: pointer;
}

td span.player {
  margin-left: 10px;
}

td span.earn {
  margin: 5px;
}

input.dist {
  width: 30px;
}

input.food {
  width: 380px;
}

.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
