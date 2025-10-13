import React from "react";
interface Prop {
    onSubmit: (input: string) => void;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    countdownCounter: number | null;
    setCountdownCounter: React.Dispatch<React.SetStateAction<number | null>>;
    onCountdownComplete: () => void;
}
declare const WBInput: ({ onSubmit, input, setInput, countdownCounter, setCountdownCounter, onCountdownComplete, }: Prop) => import("react/jsx-runtime").JSX.Element;
export default WBInput;
