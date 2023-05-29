import { NoteProps } from "../App";
import "./Note.css";
export function Note({ title, body, created }: NoteProps) {
  return (
    <ul className="Note">
      <li className="Note-header">
        <h3>{title}</h3>
        <input type="checkbox" />
      </li>
      <li>{body}</li>
      <li>{created}</li>
    </ul>
  );
}
