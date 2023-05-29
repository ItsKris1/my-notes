import { collection, addDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useRef, useState } from "react";
import { Note } from "./components/Note";
import { Button } from "./components/Button";
import { AddNote } from "./components/AddNote";
import { Overlay } from "./components/Overlay";
import { EditNote } from "./components/EditNote";

export interface Note {
  id: string;
  title: string;
  body: string;
  selected: boolean;
  created: string;
}

type OverlayContent = "EDIT_NOTE" | "ADD_NOTE";

type Notes = Note[];

function App() {
  const [notes, setNotes] = useState<Notes>([]);
  const [selectAllNotes, setSelectAllNotes] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [overlayContent, setOverlayContent] = useState<OverlayContent>();
  const [editingNoteId, setEditingNoteId] = useState<string>("");
  // const editTitleRef = useRef<HTMLInputElement>(null);
  // const editBodyRef = useRef();

  const anyNoteSelected = notes.some((note) => note.selected === true);

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const newNotes: Notes = [];
      querySnapShot.forEach((doc) => {
        newNotes.push({ ...(doc.data() as Note), id: doc.id, selected: false });
      });

      setNotes(newNotes);

      return () => unsubscribe();
    });
  }, []);

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

  function findNote(noteId: string): Note {
    const note = notes.find((note) => note.id === noteId);
    if (!note) {
      throw new Error(`FindNote didnt find note. NoteID: ${noteId}`);
    }

    return note;
  }

  // if (typeof editingNoteId === "string" && editingNoteId != "") {

  // }

  return (
    <div className="App">
      {showModal && (
        <Overlay onModalClose={() => setShowModal(false)}>
          {overlayContent === "ADD_NOTE" ? (
            <div className="Note">
              <AddNote onSubmit={() => setShowModal(false)}></AddNote>
            </div>
          ) : (
            <div className="Note">
              <EditNote note={findNote(editingNoteId)} onSubmit={() => setShowModal(false)}></EditNote>
            </div>
          )}
        </Overlay>
      )}

      <header className="App-header">
        <h1>My Notes</h1>

        {anyNoteSelected ? (
          <div>
            <label>
              Select all
              <input
                type="checkbox"
                name="select_all"
                checked={selectAllNotes}
                onChange={(e) => handleSelectedAllNotes(e)}
              />
            </label>
            <Button onClick={handleDeletedNotes} text="Delete"></Button>
          </div>
        ) : (
          <Button
            text="New note"
            onClick={(e) => {
              e.stopPropagation();
              setOverlayContent("ADD_NOTE");
              setShowModal(true);
            }}
          ></Button>
        )}
      </header>

      <main>
        <div className="Notes">
          {notes.map((note) => (
            <Note
              {...note}
              onSelected={handleNoteSelected}
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
                setOverlayContent("EDIT_NOTE");
                setEditingNoteId(note.id);
              }}
            ></Note>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
