import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../server/firebase";
import { useState } from "react";
import { Button } from "./Button/Button";

export function AddNote({ onSubmit }: { onSubmit: () => void }) {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();

    try {
      await addDoc(collection(db, "notes"), {
        title,
        body,
        created: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <textarea
        name="body"
        className="Note-body"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <Button type="primary" text="Add note" onClick={() => {}}></Button>
    </form>
  );
}
