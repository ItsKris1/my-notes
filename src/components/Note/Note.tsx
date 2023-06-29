import "./Note.css";
import type { NoteData } from "../../App";
import { useEffect, useRef } from "react";

type NoteProps = NoteData & {
  onSelected: (id: string) => void;
  onClick: (e: React.MouseEvent) => void;
  clientPos: { x: number; y: number } | undefined;
  onDragStart: (id: number) => void;
  onDragOver: (id: number) => void;
  onDrop: (id1: number, id2: number) => void;
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
  onDrop,
  index,
}: NoteProps) {
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    onSelected(id);
  }

  const noteRef = useRef<HTMLUListElement>(null);

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("text/plain", String(index));
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
      onDragStart={handleDragStart}
      onDragOver={(e) => { console.log("dragging over note") }}
      onDrop={(e) => {
        e.preventDefault();
        const noteDragged = e.dataTransfer.getData("text/plain");
        console.log("Dropped on note: ", title)
        console.log("Dragged note: ", noteDragged);

        onDrop(Number(noteDragged), index);
      }}
      draggable
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
