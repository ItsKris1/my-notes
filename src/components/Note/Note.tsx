import "./Note.css";
import type { NoteData } from "../../App";
import { useEffect, useRef } from "react";

type NoteProps = NoteData & {
  onSelected: (id: string) => void;
  onClick: (e: React.MouseEvent) => void;
};

export function Note({ id, title, body, created, selected, onSelected, onClick }: NoteProps) {
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    onSelected(id);
  }

  const noteRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rowHeight = 5;
    const rowGap = 20;
    if (noteRef.current !== null) {
      const rowSpan = Math.ceil((noteRef.current.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
      noteRef.current.style.gridRowEnd = "span " + rowSpan;
      console.log("span");
    }
  }, []);

  return (
    <ul className="Note" onClick={onClick} ref={noteRef}>
      <li className="Note-header">
        <h3>{title}</h3>
        <input type="checkbox" checked={selected} onClick={handleClick} />
      </li>
      <li>{body}</li>
      <li className="Note-created">{created}</li>
    </ul>
  );
}
