<template>
    <div class="btm-nav">
        <NuxtLink to="/player" :class="['text-primary', { active: route.name == 'player' }]">
            <font-awesome-icon :icon="['fas', 'user']" />
        </NuxtLink>
        <NuxtLink to="/house" :class="['text-secondary', { active: route.name == 'house' }]">
            <font-awesome-icon :icon="['fas', 'house']" />
        </NuxtLink>
        <NuxtLink to="/milestone" :class="['text-accent', { active: route.name == 'milestone' }]">
            <font-awesome-icon :icon="['fas', 'flag-checkered']" />
        </NuxtLink>
        <NuxtLink to="/dinnertime" :class="['text-warning', { active: route.name == 'dinnertime' }]">
            <font-awesome-icon :icon="['fas', 'burger']" />
        </NuxtLink>
    </div>
</template>

<script setup>
const route = useRoute()
</script>

<style></style>