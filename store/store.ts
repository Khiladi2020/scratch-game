import { INITIAL_SPRITES, SpritesData } from "@/constants/initialSprites";
import { create } from "zustand";

type State = {
    sprites: Array<SpritesData>;
};

type Action = {
    addSprite: (newSprite: SpritesData) => void;
};

const useAppStore = create<State & Action>((set) => ({
    sprites: INITIAL_SPRITES,
    addSprite: (newSprite) =>
        set((state) => ({ sprites: state.sprites.concat(newSprite) })),
}));

export { useAppStore };
