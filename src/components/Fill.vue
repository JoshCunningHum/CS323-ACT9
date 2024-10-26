<script lang="ts" setup>
import { useParentElement } from "@vueuse/core";
import { computed } from "vue";

const {
    overflowScrollY = true,
    overflowScrollX = false,
    noFlex = false,
    flexCol = false,
    center = false,
    hasGutter = false,
    noGrow = false,
} = defineProps<{
    overflowScrollY?: boolean;
    overflowScrollX?: boolean;
    noFlex?: boolean;
    flexCol?: boolean;
    center?: boolean;
    hasGutter?: boolean;
    noGrow?: boolean;
}>();

const parent = useParentElement();
const isFlexItem = computed(
    () => parent.value && parent.value.computedStyleMap().get("display")?.toString() === "flex"
);
</script>

<template>
    <div
        class="min-h-0"
        :class="[
            overflowScrollY && 'overflow-y-auto',
            overflowScrollX && 'overflow-x-auto',
            !noFlex && 'flex',
            flexCol && 'flex-col',
            !flexCol && 'flex-row',
            center && 'items-center',
            center && 'justify-center',
            !noGrow && 'flex-grow',
            {
                'h-full w-full': !isFlexItem,
            },
        ]"
        :style="{ scrollbarGutter: hasGutter ? 'stable' : 'auto' }"
    >
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped></style>
