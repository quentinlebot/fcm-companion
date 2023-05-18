<template>
    <div class="btm-nav">
        <NuxtLink to="/player" :class="['text-info', { active: route.name == 'player' }]">
            <font-awesome-icon :icon="['fas', 'user']" />
        </NuxtLink>
        <NuxtLink to="/turn" :class="['text-primary', { active: route.name == 'turn' }]">
            <font-awesome-icon :icon="['fas', 'people-arrows']" />
        </NuxtLink>
        <NuxtLink to="/worker" :class="['text-error', { active: route.name == 'worker' }]">
            <font-awesome-icon :icon="['fas', 'mug-hot']" />
        </NuxtLink>
        <NuxtLink to="/house" :class="['text-secondary', { active: route.name == 'house' }]">
            <font-awesome-icon :icon="['fas', 'location-dot']" />
        </NuxtLink>
        <NuxtLink to="/milestone" :class="['text-accent', { active: route.name == 'milestone' }]">
            <font-awesome-icon :icon="['fas', 'flag-checkered']" />
        </NuxtLink>
        <NuxtLink to="/dinnertime" :class="['text-warning', { active: route.name == 'dinnertime' }]">
            <font-awesome-icon :icon="['fas', 'utensils']" />
        </NuxtLink>
    </div>
</template>

<script setup>
const route = useRoute()
</script>

<style></style>