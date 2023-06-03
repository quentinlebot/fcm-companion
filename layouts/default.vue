<template>
    <div class="drawer">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <TheNav />
            <slot></slot>
        </div>
        <div class="drawer-side mt-[65px]">
            <label for="my-drawer-4" class="drawer-overlay"></label>
            <TheMenu />
        </div>
        <footer class="footer footer-center bg-base-300 absolute bottom-0">
            <a class="inline-block" href="">Made with
                <Icon name="fa6-solid:heart" class="text-red-700 mb-1" /> by
                Quentin Lebot
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