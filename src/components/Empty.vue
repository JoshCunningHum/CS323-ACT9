<script lang="ts" setup>
import Fill from "@/components/Fill.vue";

const {
    iconClass = "text-6xl",
    noIcon = false,
    selectable = false,
    text = "Empty",
    icon = "pi pi-database",
} = defineProps<{
    iconClass?: string;
    text?: string;
    noIcon?: boolean;
    selectable?: boolean;
    icon?: string;
}>();
</script>

<template>
    <Fill
        flex-col
        class="items-center justify-center text-secondary-emph text-sm flex flex-col gap-2 dmsans text-surface-400"
        :class="!selectable && 'select-none'"
    >
        <i :class="`${icon} ${iconClass} text-4xl`" v-if="!noIcon" />
        <slot>
            <span>{{ text }}</span>
        </slot>
    </Fill>
</template>

<style lang="scss" scoped></style>
