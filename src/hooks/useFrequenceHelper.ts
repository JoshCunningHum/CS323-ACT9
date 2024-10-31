import { useConfigStore } from "@/stores/config";
import { storeToRefs } from "pinia";
import { computed, type Ref } from "vue";

export const useFrequencyHelper = (input: Ref<number[]>, index: Ref<number>) => {
    const config = useConfigStore();
    const { starts } = storeToRefs(config);

    const current = computed(() => input.value[index.value]);
    const prev = computed(() => input.value[index.value - 1] ?? -1);
    const next = computed(() => input.value[index.value + 1] ?? -1);

    const unchanged = computed(() => current.value === prev.value);

    const indexByValue = (val?: number) => {
        val ??= current.value || 1;
        const initial = starts.value;

        // Count how many values until the index have the same value with the passed argument
        const portion = input.value.slice(0, index.value + 1);
        return portion.filter((v) => v === val).length + (initial === val ? 1 : 0);
    };

    return {
        current,
        prev,
        next,
        unchanged,

        indexByValue,
    };
};
