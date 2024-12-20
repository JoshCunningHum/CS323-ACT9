import { MAX_INPUT, MIN_INPUT } from "@/constants";
import { field } from "@/hooks/field";
import { useLocalStorage } from "@vueuse/core";
import { useClamp } from "@vueuse/math";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useConfigStore = defineStore("config", () => {
    const config = useLocalStorage(
        "cs323-config",
        { length: 8, starts: 0 },
        { deep: true, shallow: false }
    );
    const input_length = field(config, "length");
    const starts = field(config, "starts", 0);

    const length = useClamp(input_length, MIN_INPUT, MAX_INPUT);

    return {
        config,
        input_length,
        starts,

        length,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot));
}
