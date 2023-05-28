interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLElement>;
  text: string;
}

export function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>;
}
