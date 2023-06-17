<template>
    <div class="drawer">
        <input id="my-drawer-4" type="checkbox" class="relative drawer-toggle" />
        <div class="drawer-content z-0">
            <TheNav class="h-[64px]" />
            <div class="min-h-[calc(100vh-64px)]">
                <slot></slot>
            </div>
        </div>
        <div class="drawer-side mt-[65px] z-1">
            <label for="my-drawer-4" class="drawer-overlay"></label>
            <TheMenu />
        </div>
        <footer class="footer footer-center bg-base-300 absolute bottom-0">
            <a class="inline-block" href="">Made with
                <Icon name="fa6-solid:heart" class="text-red-700 mb-1" /> by
                Quentin
            </a>
        </footer>
    </div>
</template>

<script setup>
onMounted(() => {
    requestWakeLock();
})
const requestWakeLock = async () => {
    try {
        await navigator.wakeLock.request("screen");
    } catch (err) {
        console.log(`${err.name}, ${err.message}`);
    }
};
</script>

<style scoped>
.heart svg {
    fill: red;
}

.svg-inline {
    display: inline-block;
}
</style>