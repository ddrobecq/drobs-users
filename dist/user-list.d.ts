/// <reference types="react" />
type UserProps = {
    actions?: boolean;
    direction?: "row" | "column";
    handleSelect?: (id: number) => void;
};
export default function Users(props: UserProps): JSX.Element;
export {};
