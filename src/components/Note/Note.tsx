import "./Note.css";
import type { NoteData } from "../../App";
import { useEffect, useRef } from "react";

type NoteProps = NoteData & {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e: React.MouseEvent) => void;
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
  handleClick,
  handleChange,

  onDragStart,
  onDragOver,
  onDragEnd,
  index,
}: NoteProps) {
  // function handleClickf(e: React.MouseEvent) {
  //   e.stopPropagation();
  //   onSelected(id);
  // }

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
      ref={noteRef}
      draggable
      onDragStart={(e) => onDragStart(index)}
      onDragEnd={(e) => onDragEnd()}
      onDragOver={(e) => onDragOver(index)}
      style={styleObj}
      onClick={handleClick}
    >
      <li className="Note-header">
        <h3>{title}</h3>
        <input type="checkbox" checked={selected} onChange={handleChange} />
      </li>
      <li>{body}</li>
      <li className="Note-created">{created}</li>
    </ul>
  );
}
