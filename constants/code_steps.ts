import { Movement } from "@/store/store";

type CodeData = { name: string; action: Omit<Movement["action"], "name"> };

const CODE_STEPS: Array<CodeData> = [
    {
        name: "Move X by 50",
        action: {
            type: "xy-move-by",
            data: {
                x: 50,
            },
        },
    },
    {
        name: "Move X by 100",
        action: {
            type: "xy-move-by",
            data: {
                x: 100,
            },
        },
    },
    {
        name: "Move Y by 50",
        action: {
            type: "xy-move-by",
            data: {
                y: 50,
            },
        },
    },
    {
        name: "Move Y by 100",
        action: {
            type: "xy-move-by",
            data: {
                y: 100,
            },
        },
    },
    {
        name: "Rotate by 90 degree",
        action: {
            type: "rotate-by",
            data: {
                rotate: 90,
            },
        },
    },
    {
        name: "Say Hello",
        action: {
            type: "speak",
            data: {
                text: "Hello",
            },
        },
    },
    {
        name: "Say Awesome",
        action: {
            type: "speak",
            data: {
                text: "Awesome",
            },
        },
    },
    {
        name: "Rotate by 180 degree",
        action: {
            type: "rotate-by",
            data: {
                rotate: 180,
            },
        },
    },
    {
        name: "Go to (0,0)",
        action: {
            type: "xy-move-to",
            data: {
                x: 0,
                y: 0,
            },
        },
    },
    {
        name: "Go to random position",
        action: {
            type: "xy-move-to",
            data: {
                x: 100,
                y: 300,
            },
        },
    },
];

export { CODE_STEPS, CodeData };
