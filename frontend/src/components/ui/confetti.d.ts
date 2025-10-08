import type { ReactNode } from "react";
import React from "react";
import type { GlobalOptions as ConfettiGlobalOptions, Options as ConfettiOptions } from "canvas-confetti";
type Api = {
    fire: (options?: ConfettiOptions) => void;
};
type Props = React.ComponentPropsWithRef<"canvas"> & {
    options?: ConfettiOptions;
    globalOptions?: ConfettiGlobalOptions;
    manualstart?: boolean;
    children?: ReactNode;
};
export type ConfettiRef = Api | null;
export declare const Confetti: React.ForwardRefExoticComponent<Omit<Props, "ref"> & React.RefAttributes<ConfettiRef>>;
export {};
