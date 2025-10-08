import { JSX } from "react";
interface Prop {
    children?: JSX.Element;
    onFileSubmit: (files: FileList) => void;
    acceptedFileTypes?: string;
    multiple?: boolean;
    openInput: boolean;
    setOpenInput: (value: boolean) => void;
}
export default function FileInput({ children, onFileSubmit, multiple, acceptedFileTypes, openInput, setOpenInput, }: Prop): import("react/jsx-runtime").JSX.Element;
export {};
