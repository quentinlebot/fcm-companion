<template>
    <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <li v-for="page in pages" :key="page.path" :class="[route.name == page.path.replace('/', '') ? page.color : '']">
            <NuxtLink :to="page.path">
                <Icon :name="page.icon" />
                <a>{{ page.label }}</a>
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup>
const route = useRoute()
const pages = [
    {
        path: '/player',
        label: 'Player',
        icon: 'fa6-solid:user',
        color: 'text-info',
    },
    {
        path: '/turn',
        label: 'Turn',
        icon: 'fa6-solid:people-arrows',
        color: 'text-primary',
    },
    {
        path: '/worker',
        label: 'Worker',
        icon: 'fa6-solid:mug-hot',
        color: 'text-error',
    },
    {
        path: '/milestone',
        label: 'Milestone',
        icon: 'fa6-solid:flag-checkered',
        color: 'text-accent',
    },
    {
        path: '/stock',
        label: 'Stock',
        icon: 'fa6-solid:beer-mug-empty',
        color: 'text-success',
    },
    {
        path: '/house',
        label: 'House',
        icon: 'fa6-solid:location-dot',
        color: 'text-secondary',
    },
    {
        path: '/dinnertime',
        label: 'Dinnertime',
        icon: 'fa6-solid:utensils',
        color: 'text-warning',
    },
]
</script>

<style></style>