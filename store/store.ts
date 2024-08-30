import { INITIAL_SPRITES, SpritesData } from "@/constants/initialSprites";
import { create } from "zustand";

export type Movement = {
    id?: string;
    spriteName: string;
    action: {
        name: string;
        /** `xy-teleport` will shift it to absolute position
         * `xy-move` will move it by that number
         */
        type: "xy-move-to" | "xy-move-by" | "rotate-to" | "rotate-by" | "speak";
        data: { x?: number; y?: number; rotate?: number; text?: string };
    };
};

type State = {
    sprites: Array<SpritesData>;
    movements: Array<Movement>;
    isAnimationPlaying: boolean;
    isGameResetted: boolean;
};

type Action = {
    addSprite: (newSprite: SpritesData) => void;
    removeSprite: (spriteName: string) => void;
    addMovement: (newMovement: Movement) => void;
    removeMovement: (movementId: string) => void;
    setAnimationState: (value: boolean) => void;
    resetGameState: () => void;
    setGameResettedToFalse: () => void;
};

const useAppStore = create<State & Action>((set) => ({
    sprites: INITIAL_SPRITES,
    movements: [],
    isAnimationPlaying: false,
    isGameResetted: false,
    addSprite: (newSprite) =>
        set((state) => ({ sprites: state.sprites.concat(newSprite) })),
    removeSprite: (spriteName) =>
        set((state) => ({
            sprites: state.sprites.filter((val) => val.name != spriteName),
        })),
    addMovement: (newMovement) =>
        set((state) => ({
            movements: state.movements.concat({
                ...newMovement,
                id: state.movements.length.toString(),
            }),
        })),
    removeMovement: (movementId) =>
        set((state) => ({
            movements: state.movements.filter((val) => val.id != movementId),
        })),
    setAnimationState: (newVal) => set(() => ({ isAnimationPlaying: newVal })),
    setGameResettedToFalse: () => set(() => ({ isGameResetted: false })),
    resetGameState: () =>
        set(() => ({
            isAnimationPlaying: false,
            sprites: INITIAL_SPRITES,
            movements: [],
            isGameResetted: true,
        })),
}));

export { useAppStore };
