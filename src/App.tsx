import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./server/firebase";
import { useEffect, useState } from "react";
import { Note } from "./components/Note/Note";
import { Button } from "./components/Button/Button";
import { AddNote } from "./components/AddNote";
import { Modal } from "./components/Modal/Modal";
import { EditNote } from "./components/EditNote";
import { ReactComponent as TrashLogo } from "./icons/trash_icon.svg";
import { ReactComponent as PlusLogo } from "./icons/plus_icon.svg";
import { useNotes } from "./useNote";

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

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>();

  useEffect(() => {
    function resizeGridItem(item: HTMLElement) {
      if (item !== null) {
        const grid = document.getElementsByClassName("Notes")[0];
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap"));
        const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        console.log("Row span", rowSpan);

        item.style.gridRowEnd = "span " + rowSpan;
      }
    }

    function resizeAllGridItems() {
      const allItems = document.getElementsByClassName("Note");
      for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x] as HTMLElement);
      }
    }

    resizeAllGridItems();
  });

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
    setShowModal(!showModal);
  }

  function addDummyData() {}

  return (
    <div className="App">
      {showModal && (
        <Modal onModalClose={toggleShowModal}>
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
            <Button onClick={addDummyData} text="Add dummy data" type="primary"></Button>

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
        <div className="Notes">
          {notes.map((note) => (
            <Note
              {...note}
              onSelected={handleNoteSelected}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                toggleShowModal();
                setModalContent("EDIT_NOTE");
                setEditingNote(note);
              }}
            ></Note>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
