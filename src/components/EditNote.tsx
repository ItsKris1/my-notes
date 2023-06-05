import { useState } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../server/firebase";
import type { NoteData } from "../App";
import { Button } from "./Button/Button";

type EditNoteProps = {
  onSubmit: () => void;
  note: NoteData | null;
};

export function EditNote({ note, onSubmit }: EditNoteProps) {
  const [title, setTitle] = useState<string>(note!.title);
  const [body, setBody] = useState<string>(note!.body);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit();

    try {
      await runTransaction(db, async (transaction) => {
        const docRef = doc(db, "notes", note!.id);
        const docNote = await transaction.get(docRef);

        if (!docNote.exists()) {
          throw new Error(`Note: ${note!.id} doesnt exist`);
        }

        transaction.update(docRef, { title, body });
      });
    } catch (e) {
      console.error("Error editing document: ", e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <textarea name="body" value={body} className="Note-body" onChange={(e) => setBody(e.target.value)} />

      <Button type="primary" text="Save changes" onClick={() => {}}></Button>
    </form>
  );
}
