import { computed, isRef, ref, type MaybeRefOrGetter } from "vue";

export const field = <T extends Record<string, any>, K extends keyof T, V extends T[K]>(
    obj: MaybeRefOrGetter<T>,
    field: K,
    initial?: V
) => {
    const val = isRef(obj) ? obj : ref(obj as T);

    return computed({
        get: () => val.value[field] || (initial as V),
        set: (v: V) => (val.value[field] = v),
    });
};
