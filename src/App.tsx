import { collection, addDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useRef, useState } from "react";

interface Note {
  id: string;
  title: string;
  body: string;
  selected: boolean;
  created: string;
}

type Notes = Note[];

function App() {
  const [notes, setNotes] = useState<Notes>([]);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [selectAllNotes, setSelectAllNotes] = useState<boolean>(false);

  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editingBodyId, setEditingBodyId] = useState("");

  const editTitleRef = useRef<HTMLInputElement>(null);
  const editBodyRef = useRef();

  const anyNoteSelected = notes.some((note) => note.selected === true);

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const newNotes: Notes = [];
      querySnapShot.forEach((doc) => {
        console.log("Got notes");

        newNotes.push({ ...(doc.data() as Note), id: doc.id, selected: false });
      });

      setNotes(newNotes);

      return () => unsubscribe();
    });
  }, []);

  useEffect(() => {
    if (editTitleRef.current !== null && editingTitleId) {
      editTitleRef.current.focus();
    }
  }, [editingTitleId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTitle("");
    setBody("");

    try {
      await addDoc(collection(db, "notes"), {
        title,
        body,
        created: new Date().toLocaleString(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Notes</h1>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label>
              Title
              <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Text
              <input type="text" name="body" value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
          </div>

          <button>Add note</button>
        </form>

        {anyNoteSelected && (
          <label>
            Select all
            <input
              type="checkbox"
              name="select_all"
              checked={selectAllNotes}
              onChange={(e) => handleSelectedAllNotes(e)}
            />
          </label>
        )}
        <ul>
          {notes?.map((note) => (
            <div key={note.id}>
              <li>
                <div>
                  {editingTitleId === note.id ? (
                    <input type="text" onBlur={() => setEditingTitleId(null)} ref={editTitleRef}></input>
                  ) : (
                    <p onDoubleClick={(e) => setEditingTitleId(note.id)}>{note.title}</p>
                  )}

                  <br></br>

                  <p onDoubleClick={(e) => setEditingBodyId(note.id)}>{note.body}</p>
                  <br></br>
                  <p>{note.created}</p>
                  <input type="checkbox" checked={note.selected} onChange={() => handleNoteSelected(note.id)}></input>
                </div>
              </li>
            </div>
          ))}
        </ul>

        {anyNoteSelected ? (
          <div>
            <button onClick={handleDeletedNotes}>Delete notes</button>
          </div>
        ) : null}
      </header>

      <main></main>
    </div>
  );
}

export default App;
