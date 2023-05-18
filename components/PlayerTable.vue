<script setup lang="ts">
import type { Player } from '@/types/player';

const props = defineProps<{
  players: Player[],
}>()

</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Show</th>
        <th>Name</th>
        <th><img src="@/assets/MilestoneBurger.jpg" width="100" /></th>
        <th><img src="@/assets/MilestonePizza.jpg" width="100" /></th>
        <th><img src="@/assets/MilestoneDrink.jpg" width="100" /></th>
        <th><img src="@/assets/MilestonePrice.jpg" width="100" /></th>
        <th><img src="@/assets/pricing.jpg" width="100" /></th>
        <th><img src="@/assets/discount.jpg" width="100" /></th>
        <th><img src="@/assets/luxurie.jpg" width="100" /></th>
        <th><img src="@/assets/waitress.jpg" width="100" /></th>
        <th><img src="@/assets/cfo.jpg" width="100" /></th>
        <th>Unit price</th>
        <th>Burger</th>
        <th>Pizza</th>
        <th>Drink</th>
        <th>Turn order</th>
      </tr>
    </thead>
    <tbody>
      <PlayerRow v-for="(player, index) in players" v-bind:key="player.id" :player="player"
        :last="index == (players.length - 1) || (players[index + 1].hide)"
        :lastUntickable="players[index].hide && index > 0 && players[index - 1].hide" />
    </tbody>
  </table>
</template>
