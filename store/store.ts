import { INITIAL_SPRITES, SpritesData } from "@/constants/initialSprites";
import { create } from "zustand";

export type Movement = {
    spriteName: string;
    action: { name: string; data: any };
};

type State = {
    sprites: Array<SpritesData>;
    movements: Array<Movement>;
};

type Action = {
    addSprite: (newSprite: SpritesData) => void;
    addMovement: (newMovement: Movement) => void;
};

const useAppStore = create<State & Action>((set) => ({
    sprites: INITIAL_SPRITES,
    movements: [],
    addSprite: (newSprite) =>
        set((state) => ({ sprites: state.sprites.concat(newSprite) })),
    addMovement: (newMovement) =>
        set((state) => ({ movements: state.movements.concat(newMovement) })),
}));

export { useAppStore };
