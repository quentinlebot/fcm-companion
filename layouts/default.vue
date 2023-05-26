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
    </div>
</template>