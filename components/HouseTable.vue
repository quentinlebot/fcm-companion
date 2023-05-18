<script setup lang="ts">
import { usePlayer } from '@/models/player';
import { useHouse } from '@/models/house';

const players = computed(() => usePlayer().global.value.players.filter(player => !player.hide))
const houses = computed(() => useHouse().global.value.houses)
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Show</th>
        <th>Id</th>
        <th>Garden</th>
        <th>Park</th>
        <th v-for="player in players">Dist P{{ player.id }}</th>
        <th>Price multiplier</th>
        <th>Sorted player from price and distance rules</th>
        <th>Items sold</th>
        <th>Earning</th>
      </tr>
    </thead>
    <tbody>
      <HouseRow v-for="house in houses" v-bind:key="house.id" :house="house" />
    </tbody>
  </table>
</template>
