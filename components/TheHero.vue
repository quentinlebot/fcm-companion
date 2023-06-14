<template>
    <div class="hero">
        <div class="hero-content flex-col h-screen">
            <div class="flex gap-10">
                <img class="max-w-[100px] md:max-w-[350px] object-contain" src="/img/3DboxFCM.png"
                    alt="food chain magnate board game box" />
                <img class="max-w-[95px] md:max-w-[340px] object-contain" src="/img/3DboxFCM_KM.png"
                    alt="fcm ketchup mecanism board game box" />
            </div>
            <div class="flex flex-col text-center h-full justify-center place-items-center">
                <h1 class="text-5xl font-bold kansas my-5">Dinnertime companion</h1>
                <p class="py-5">Welcome to the ultimate companion for Food Chain Magnate board game !
                    <br />This tool has been created to simplify the process of dinnertime calculation.
                </p>
                <NuxtLink to="/player" class="btn btn-primary my-10 w-1/2">Get Started</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
img.mirror {
    transform: scaleX(-1);
}
</style>