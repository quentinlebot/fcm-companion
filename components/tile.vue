<template>
    <div class="tile">
        <img :src="img" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['img']);
</script>

<style scoped></style>