import "./Note.css";
import type { NoteData } from "../../App";

type NoteProps = NoteData & {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e: React.MouseEvent) => void;
  onDragStart: (id: number) => void;
  onDragOver: (id: number) => void;
  onDragEnd: () => void;
  index: number;
};

export function Note({
  title,
  body,
  created,
  selected,
  handleClick,
  handleChange,

  onDragStart,
  onDragOver,
  onDragEnd,
  index,
}: NoteProps) {
  return (
    <ul
      className="Note"
      draggable
      onDragStart={(e) => onDragStart(index)}
      onDragEnd={(e) => onDragEnd()}
      onDragOver={(e) => onDragOver(index)}
      onClick={handleClick}
    >
      <li className="Note-header">
        <h3>{title}</h3>
        <input
          type="checkbox"
          checked={selected}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
        />
      </li>
      <li>{body}</li>
      <li className="Note-created">{created}</li>
    </ul>
  );
}
