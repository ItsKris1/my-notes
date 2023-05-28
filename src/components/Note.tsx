import { NoteProps } from "../App";

export function Note({ title, body, created }: NoteProps) {
  return (
    <ul className="note">
      <li>{title}</li>
      <li>{body}</li>
      <li>{created}</li>
    </ul>
  );
}
