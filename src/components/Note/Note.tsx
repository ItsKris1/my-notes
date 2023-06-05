import "./Note.css";
import type { NoteData } from "../../App";

type NoteProps = NoteData & {
  onSelected: (id: string) => void;
  onClick: (e: React.MouseEvent) => void;
};

export function Note({ id, title, body, created, selected, onSelected, onClick }: NoteProps) {
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    onSelected(id);
  }

  return (
    <ul className="Note" onClick={onClick}>
      <li className="Note-header">
        <h3>{title}</h3>
        <input type="checkbox" checked={selected} onClick={handleClick} />
      </li>
      <li>{body}</li>
      <li className="Note-created">{created}</li>
    </ul>
  );
}
