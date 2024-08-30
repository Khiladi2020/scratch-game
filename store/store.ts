import { INITIAL_SPRITES, SpritesData } from "@/constants/initialSprites";
import { create } from "zustand";

export type Movement = {
    spriteName: string;
    action: {
        name: string;
        /** `xy-teleport` will shift it to absolute position
         * `xy-move` will move it by that number
         */
        type: "xy-move-to" | "xy-move-by" | "rotate";
        data: { x?: number; y?: number };
    };
};

type State = {
    sprites: Array<SpritesData>;
    movements: Array<Movement>;
    isAnimationPlaying: boolean;
};

type Action = {
    addSprite: (newSprite: SpritesData) => void;
    addMovement: (newMovement: Movement) => void;
    setAnimationState: (value: boolean) => void;
};

const useAppStore = create<State & Action>((set) => ({
    sprites: INITIAL_SPRITES,
    movements: [],
    isAnimationPlaying: false,
    addSprite: (newSprite) =>
        set((state) => ({ sprites: state.sprites.concat(newSprite) })),
    addMovement: (newMovement) =>
        set((state) => ({ movements: state.movements.concat(newMovement) })),
    setAnimationState: (newVal) => set(() => ({ isAnimationPlaying: newVal })),
}));

export { useAppStore };
