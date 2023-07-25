<template>
    <div class="navbar shadow-md">
        <div class="navbar-start">
            <div class="dropdown">
                <label for="my-drawer-4" tabindex="0" class="btn btn-ghost btn-circle text-lg">
                    <Icon name="fa6-solid:burger" />
                </label>
            </div>
        </div>
        <div class="navbar-end">
            <div class="tooltip tooltip-left" data-tip="Reset game">
                <label for="cb_resetData" class="btn btn-ghost btn-circle text-lg">
                    <Icon name="fa6-solid:arrow-rotate-left" />
                </label>
            </div>
        </div>
        <input type="checkbox" id="cb_resetData" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Reset all data</h3>
                <p class="py-4">Are you sure you want to reset all data, you will lose all your progress ?
                </p>
                <div class="modal-action">
                    <label class="btn btn-primary btn-error" for="cb_resetData" @click="resetData">Accept</label>
                    <label class="btn btn-ghost" for="cb_resetData">Cancel</label>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useMainStore } from '@/stores/main';

const store = useMainStore();

function resetData() {
    store.$reset();
    navigateTo('/')
}
</script>