import React from "react";

const GameContext = React.createContext<null | {
    height: number;
    width: number;
}>(null);

export default GameContext;
