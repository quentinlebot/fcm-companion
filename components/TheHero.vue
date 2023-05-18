<template>
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row">
            <img src="/img/3DboxFCM.png" class="max-w-sm rounded-lg" />
            <div class="text-center">
                <h1 class="text-5xl font-bold kansas">Dinnertime companion</h1>
                <p class="py-6">Welcome to the ultimate companion for Food Chain Magnate ! We understand that
                    calculating dinner time stages can be complex, so we've created a tool to simplify the process.</p>
                <NuxtLink to="/player" class="btn btn-primary">Get Started</NuxtLink>
            </div>
            <img src="/img/3DboxFCM_KM.png" class="max-w-sm rounded-lg mirror" />
        </div>
    </div>
</template>

<script setup>
</script>

<style>
img.mirror {
    transform: scaleX(-1);
}
</style>