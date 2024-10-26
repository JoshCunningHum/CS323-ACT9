<script setup lang="ts">
import Screen from "./components/Screen.vue";

import { onMounted, provide, ref } from "vue";
import { useConfigStore } from "./stores/config";
import { storeToRefs } from "pinia";
import { useClamp } from "@vueuse/math";
import { MAX_INPUT, MIN_INPUT } from "./constants";
import { set, watchImmediate } from "@vueuse/core";
import Digit from "./components/Digit.vue";
import Frequency from "./components/Frequency.vue";
import LengthSlider from "./components/LengthSlider.vue";
import BinaryInput from "./components/BinaryInput.vue";

import NrzLBlock from "./components//Block/NrzL.vue";
import NrzIBlock from "./components/Block/NrzI.vue";
import BipolarAMIBlock from "./components/Block/BipolarAMI.vue";
import PseudoTernaryBlock from "./components/Block/PseudoTernary.vue";
import ManchesterBlock from "./components/Block/Manchester.vue";
import DiffManchesterBlock from "./components/Block/DiffManchester.vue";

// Config
const configStore = useConfigStore();
const { length } = storeToRefs(configStore);

// Input
const input = ref<(1 | 0)[]>([]);

// Input Operations
const randomize = () => {
    set(
        input,
        Array(length.value)
            .fill(0)
            .map(() => Math.round(Math.random()))
    );
};

// Set to random on mount
watchImmediate(length, randomize);

// Hover effect on column
const hovered = ref(-1);
provide("hovered", hovered);
provide("sethovered", set.bind(null, hovered));
</script>

<template>
    <Screen class="max-w-screen-lg mx-auto py-4 space-y-4 flex flex-col">
        <!-- Input Length -->
        <LengthSlider class="my-8" />

        <!-- Input -->
        <div class="text-right text-muted-color">Click on the digits to change the input</div>
        <div class="flex justify-end mb-10" v-auto-animate>
            <div class="mr-auto h-min flex flex-col">
                <Button v-tooltip="'Randomize'" icon="pi pi-wave-pulse" text @click="randomize" />
            </div>
            <BinaryInput v-model="input" />
        </div>

        <Frequency v-model="input" label="NRZ-L">
            <template #block="{ index }">
                <NrzLBlock :index :input />
            </template>
        </Frequency>
        <Frequency v-model="input" label="NRZ-I">
            <template #block="{ index }">
                <NrzIBlock :index :input />
            </template>
        </Frequency>
        <Frequency v-model="input" label="Bipolor AMI">
            <template #block="{ index }">
                <BipolarAMIBlock :index :input />
            </template>
        </Frequency>
        <Frequency v-model="input" label="Pseudoternary">
            <template #block="{ index }">
                <PseudoTernaryBlock :index :input />
            </template>
        </Frequency>
        <Frequency v-model="input" label="Manchester">
            <template #block="{ index }">
                <ManchesterBlock :index :input />
            </template>
        </Frequency>
        <Frequency v-model="input" label="Differential Manchester">
            <template #block="{ index }">
                <DiffManchesterBlock :index :input />
            </template>
        </Frequency>

        <div class="flex-grow"></div>

        <div class="flex justify-end p-4 mt-auto">
            <div class="text-muted-color">Powered by</div>
            <div class="flex items-center -ml-12 pt-6 text-green-400 font-semibold">
                <img src="./assets/vue.png" width="50px" />
                <span>Vue JS</span>
            </div>
        </div>
    </Screen>
</template>

<style lang="scss" scoped></style>
