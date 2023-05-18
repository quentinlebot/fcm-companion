<template>
    <div class="navbar bg-base-200 shadow-md">
        <NuxtLink to="/" class="btn btn-circle normal-case text-xl">
            <font-awesome-icon :icon="['fas', 'burger']" />
        </NuxtLink>
        <button class="btn btn-ghost normal-case text-xl absolute right-10">
            <font-awesome-icon :icon="['fas', 'arrow-rotate-left']" />
        </button>
    </div>
</template>

<script setup>
</script>

<style></style>