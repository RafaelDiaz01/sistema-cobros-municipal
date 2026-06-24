export const contribuyentesKeys = {
    all: ["contribuyentes"],

    lists: () => [...contribuyentesKeys.all, "list"],

    list: (filters) => [
        ...contribuyentesKeys.lists(),
        filters,
    ],

    stats: () => [
        ...contribuyentesKeys.all,
        "stats",
    ],
};