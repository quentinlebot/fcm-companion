<template>
    <div class="flex flex-col relative h-[calc(100vh-64px)]">
        <h3 class="text-center my-5 text-5xl uppercase font-bold kansas">Workers</h3>
        <p class="font-bold uppercase divider md:mx-[10%]">Select active worker for this turn</p>
        <div class="flex justify-center h-full">
            <div class="flex gap-2 justify-center h-full place-items-center">
                <div>
                    <img src="/img/e_pricing_manager.jpg" format="webp" sizes="sm:100vw md:50vw lg:400px" />
                </div>
                <div>
                    <img src="/img/e_discount_manager.jpg" format="webp" sizes="sm:100vw md:50vw lg:400px" />
                </div>
                <div>
                    <img src="/img/e_luxuries_manager.jpg" format="webp" sizes="sm:100vw md:50vw lg:400px" />
                </div>
                <div>
                    <img src="/img/e_cfo.jpg" format="webp" sizes="sm:100vw md:50vw lg:400px" />
                </div>
                <div>
                    <img src="/img/e_waitress.jpg" format="webp" sizes="sm:100vw md:50vw lg:400px" />
                </div>
            </div>
        </div>
        <div class="flex w-full justify-center fixed bottom-5">
            <NuxtLink to="/milestone" class="">
                <button class="btn btn-outline mt-3" :disabled="players.length < 2">Next</button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

const store = usePlayerStore();

let { players } = storeToRefs(store);
</script>

<style></style>