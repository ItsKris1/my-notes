import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./server/firebase";
import { useEffect, useRef, useState } from "react";
import { Note } from "./components/Note/Note";
import { Button } from "./components/Button/Button";
import { AddNote } from "./components/AddNote";
import { Modal } from "./components/Modal/Modal";
import { EditNote } from "./components/EditNote";
import { ReactComponent as TrashLogo } from "./icons/trash_icon.svg";
import { ReactComponent as PlusLogo } from "./icons/plus_icon.svg";
import { useNotes } from "./useNote";
import { dummyNotesData } from "./dummyData";

import Masonry from "react-masonry-css";

//...

export interface NoteData {
  id: string;
  title: string;
  body: string;
  selected: boolean;
  created: string;
}

type ModalContent = "EDIT_NOTE" | "ADD_NOTE";

function App() {
  const [notes, setNotes] = useNotes();

  const [selectAllNotes, setSelectAllNotes] = useState<boolean>(false);

  const [editingNote, setEditingNote] = useState<NoteData | null>(null);

  // console.log("editingNote", editingNote);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>();

  const [clientPos, setClientPos] = useState<{ x: number; y: number }>();

  const notesRef = useRef<HTMLDivElement>(null);
  const [draggableNote, setDraggableNote] = useState<number>();
  const [draggedOnNote, setDraggedOnNote] = useState<number>();

  function onNoteDragStart(noteId: number) {
    console.log("Dragging note: ", noteId);
    setDraggableNote(noteId);
  }

  function onNoteDragEnd() {
    console.log("dragged to", draggedOnNote);
    if (draggableNote === draggedOnNote) {
      return;
    }

    const draggedNote = notes[draggableNote as number];
    const draggedOnNote1 = notes[draggedOnNote as number];

    setNotes(
      notes.map((note, index) => {
        if (index === draggableNote) {
          return { ...draggedOnNote1 };
        }
        if (index === draggedOnNote) {
          return { ...draggedNote };
        }

        return note;
      })
    );
  }

  useEffect(() => {
    // const fn = (e: DragEvent) => console.log(e);
    // if (document !== null) {
    //   document.addEventListener("dragover", (e: DragEvent) => {
    //     setClientPos({ x: e.clientX, y: e.clientY });
    //   });
    // }
    // return () => document.removeEventListener("dragover", fn);
  }, []);

  const anyNoteSelected = notes.some((note) => note.selected === true);

  function handleNoteSelected(noteId: string) {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, selected: !note.selected };
        } else {
          return note;
        }
      })
    );
  }

  function handleSelectedAllNotes(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectAllNotes(e.target.checked);
    setNotes(
      notes.map((note) => {
        return { ...note, selected: e.target.checked };
      })
    );
  }

  async function handleDeletedNotes() {
    const selectedNotesIds: string[] = [];
    for (const note of notes) {
      if (note.selected) selectedNotesIds.push(note.id);
    }

    for (const noteId of selectedNotesIds) {
      const document = doc(db, "notes", noteId);
      deleteDoc(document);
    }
    setSelectAllNotes(false);
  }

  function toggleShowModal() {
    console.log("toggleShowModal", showModal);
    setShowModal(!showModal);
  }

  function addDummyData() {
    dummyNotesData.forEach(async (dummyNote) => {
      try {
        await addDoc(collection(db, "notes"), dummyNote);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  }

  // console.log("selectedNote", selected);

  const breakpointColumnsObj = {
    default: 3,
    1700: 2,
    1200: 1,
  };
  return (
    <div className="App">
      {showModal && (
        <Modal onModalClose={() => {}}>
          {modalContent === "ADD_NOTE" ? (
            <AddNote onSubmit={toggleShowModal}></AddNote>
          ) : (
            <EditNote note={editingNote} onSubmit={toggleShowModal}></EditNote>
          )}
        </Modal>
      )}

      <header className="App-header">
        <h1 className="App-header__title">myNotes</h1>

        {anyNoteSelected ? (
          <div className="button_menu">
            <label className="btn primary">
              Select all
              <input
                type="checkbox"
                name="select_all"
                checked={selectAllNotes}
                onChange={(e) => handleSelectedAllNotes(e)}
              />
            </label>

            <Button onClick={handleDeletedNotes} text="Delete" type="danger">
              <TrashLogo></TrashLogo>
            </Button>
          </div>
        ) : (
          <div className="button_menu">
            <Button
              onClick={addDummyData}
              text="Add dummy data"
              type="primary"
            ></Button>

            <Button
              text="New note"
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                setModalContent("ADD_NOTE");
                toggleShowModal();
              }}
            >
              <PlusLogo></PlusLogo>
            </Button>
          </div>
        )}
      </header>

      <main>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note, index) => (
            <Note
              {...note}
              key={note.id}
              handleChange={(e: React.ChangeEvent) => {
                console.log("change event");
                handleNoteSelected(note.id);
              }}
              handleClick={(e: React.MouseEvent) => {
                console.log("click event");
                e.stopPropagation();

                // toggleShowModal();
                setShowModal(!showModal);
                // setModalContent("EDIT_NOTE");
                setEditingNote(note);
              }}
              clientPos={clientPos}
              // onDragStart={onNoteDragStart}
              // onDragOver={(index: number) => setDraggedOnNote(index)}
              // onDragEnd={onNoteDragEnd}
              index={index}
            ></Note>
          ))}
        </Masonry>
      </main>
    </div>
  );
}

export default App;
