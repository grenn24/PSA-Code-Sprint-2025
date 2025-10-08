export declare const useWebsocket: () => void;
export declare function useResizeObserverRef<T extends HTMLElement>(measure?: "contentRect" | "client" | "offset"): {
    width: number;
    height: number;
    ref: (node: T | null) => (() => void) | undefined;
};
