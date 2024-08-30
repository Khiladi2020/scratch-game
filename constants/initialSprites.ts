import React from "react";
import SvgImages from "./SvgImages";

export type SpritesData = {
    name: string;
    image: React.ReactElement;
};

const INITIAL_SPRITES: Array<SpritesData> = [
    {
        name: "Cat",
        image: SvgImages.Cat,
    },
];

export { INITIAL_SPRITES };
