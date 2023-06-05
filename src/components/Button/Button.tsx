import { FunctionComponent, PropsWithChildren, SVGProps } from "react";
import "./Button.css";

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLElement>;
  icon?: FunctionComponent<SVGProps<SVGAElement>>;
  text: string;
  type: "primary" | "danger";
}

export function Button({ children, text, type, onClick }: PropsWithChildren<ButtonProps>) {
  return (
    <button onClick={onClick} className={"btn " + type}>
      {text}
      {children}
    </button>
  );
}
