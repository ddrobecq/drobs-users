/// <reference types="react" />
import { UserSize } from "./lib/common";
type UserProps = {
    url: string;
    actions?: boolean;
    direction?: "row" | "column";
    handleSelect?: (id: number) => void;
    size?: UserSize;
};
export default function Users(props: UserProps): JSX.Element;
export {};
