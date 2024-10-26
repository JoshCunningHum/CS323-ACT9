export enum Pos {
    TopLeft,
    TopCenter,
    TopRight,
    MidLeft,
    MidCenter,
    MidRight,
    BotLeft,
    BotCenter,
    BotRight,
}

export const c = (pos: Pos) =>
    (
        [
            [0, 0],
            [50, 0],
            [100, 0],
            [0, 50],
            [50, 50],
            [100, 50],
            [0, 100],
            [50, 100],
            [100, 100],
        ] as [number, number][]
    )[pos];
export const cobj = (poss: ([number, number] | Pos)[]) =>
    poss.reduce((obj, curr, i) => {
        const [x, y] = Array.isArray(curr) ? curr : c(curr);
        obj[`x${i}`] = x;
        obj[`y${i}`] = y;
        return obj;
    }, {} as Record<string, number>);

export const cobjr = (obj: Record<string, number>) => {
    const entries = Object.entries(obj);
    const arr: [number, number][] = [];
    entries.forEach(([k, v]) => {
        const axis = k[0] as "x" | "y";
        const index = Number(k.slice(1));
        if (isNaN(index)) return;

        if (arr[index]) arr[index][axis == "x" ? 0 : 1] = v;
        else arr[index] = [v, 0];
    });
    return arr;
};
export const cpath = (values: [number, number][]) =>
    values
        .slice(1)
        .reduce((acc, curr) => (acc += ` ${curr.join(",")}`), `M ${values[0].join(",")} L`);
