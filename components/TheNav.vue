<template>
    <div class="btm-nav z-50">
        <NuxtLink v-for="page in pages" :key="page.path" :to="page.path"
            :class="[page.color, { active: route.name == page.path.replace('/', '') }]">
            <Icon :name="page.icon" />
        </NuxtLink>
    </div>
</template>

<script setup>
const route = useRoute()

const pages = [
    {
        path: '/player',
        icon: 'fa6-solid:user',
        color: 'text-info',
    },
    {
        path: '/turn',
        icon: 'fa6-solid:people-arrows',
        color: 'text-primary',
    },
    {
        path: '/worker',
        icon: 'fa6-solid:mug-hot',
        color: 'text-error',
    },
    {
        path: '/house',
        icon: 'fa6-solid:location-dot',
        color: 'text-secondary',
    },
    {
        path: '/milestone',
        icon: 'fa6-solid:flag-checkered',
        color: 'text-accent',
    },
    {
        path: '/dinnertime',
        icon: 'fa6-solid:utensils',
        color: 'text-warning',
    },
]

</script>

<style></style>