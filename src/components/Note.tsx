import "./Note.css";
import type { Note } from "../App";

type NoteProps = Note & {
  onSelected: (id: string) => void;
  onClick: (e: React.MouseEvent) => void;
};

export function Note({ id, title, body, created, selected, onSelected, onClick }: NoteProps) {
  return (
    <ul className="Note" onClick={onClick}>
      <li className="Note-header">
        <h3>{title}</h3>
        <input type="checkbox" checked={selected} onChange={() => onSelected(id)} />
      </li>
      <li>{body}</li>
      <li>{created}</li>
    </ul>
  );
}
