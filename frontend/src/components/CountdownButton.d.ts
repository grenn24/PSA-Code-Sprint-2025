interface Prop {
    onClick?: () => void;
    onCountdownComplete: () => void;
    count: number | null;
    setCount: React.Dispatch<React.SetStateAction<number | null>>;
}
declare const CountdownButton: ({ onCountdownComplete, count, setCount, onClick, }: Prop) => import("react/jsx-runtime").JSX.Element;
export default CountdownButton;
