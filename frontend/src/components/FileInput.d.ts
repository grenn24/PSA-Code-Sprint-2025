import { JSX } from "react";
interface Prop {
    children?: JSX.Element;
    onFileSubmit: (files: FileList) => void;
    acceptedFileTypes?: string;
    multiple?: boolean;
    open: boolean;
    setOpen: (value: boolean) => void;
}
export default function FileInput({ children, onFileSubmit, multiple, acceptedFileTypes, open, setOpen, }: Prop): import("react/jsx-runtime").JSX.Element;
export {};
