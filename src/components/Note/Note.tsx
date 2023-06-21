import "./Note.css";
import type { NoteData } from "../../App";
import { useEffect, useRef } from "react";

type NoteProps = NoteData & {
  onSelected: (id: string) => void;
  onClick: (e: React.MouseEvent) => void;
  clientPos: { x: number; y: number } | undefined;
  onDragStart: (id: number) => void;
  onDragOver: (id: number) => void;
  onDragEnd: () => void;
  index: number;
};

export function Note({
  id,
  title,
  body,
  created,
  selected,
  onSelected,
  onClick,

  onDragStart,
  onDragOver,
  onDragEnd,
  index,
}: NoteProps) {
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    onSelected(id);
  }

  const noteRef = useRef<HTMLUListElement>(null);

  function handleDragStart(noteTitle: string) {
    // console.log("Started dragging: ", noteTitle);
  }
  function handleDragEnter(noteTitle: string) {
    // console.log("Entered: ", noteTitle);
  }
  function handleDragEnd() {
    // console.log("Drag ended");
  }

  // apply note pos if dragged

  let styleObj: React.CSSProperties = {};
  // if (isDragged) {
  //   console.log("clientPos", clientPos);
  //   console.log("dragged");
  //   styleObj = { position: "absolute", left: clientPos!.x, top: clientPos!.y };
  // } else {
  //   // styleObj = {};
  // }

  return (
    <ul
      className="Note"
      onClick={onClick}
      ref={noteRef}
      draggable
      onDragStart={(e) => onDragStart(index)}
      onDragEnd={(e) => onDragEnd()}
      onDragOver={(e) => onDragOver(index)}
      style={styleObj}
    >
      <li className="Note-header">
        <h3>{title}</h3>
        <input type="checkbox" checked={selected} onClick={handleClick} />
      </li>
      <li>{body}</li>
      <li className="Note-created">{created}</li>
    </ul>
  );
}
