import { computed, type Ref } from "vue";

export const useFrequencyHelper = (input: Ref<number[]>, index: Ref<number>) => {
    const current = computed(() => input.value[index.value]);
    const prev = computed(() => input.value[index.value - 1] ?? -1);
    const next = computed(() => input.value[index.value + 1] ?? -1);

    const unchanged = computed(() => current.value === prev.value);

    const indexByValue = (val?: number) => {
        val ??= current.value;

        // Count how many values until the index have the same value with the passed argument
        const portion = input.value.slice(0, index.value + 1);
        return portion.filter((v) => v === val).length;
    };

    return {
        current,
        prev,
        next,
        unchanged,

        indexByValue,
    };
};
