import { addDoc, collection } from "firebase/firestore";
import { db } from "../server/firebase";
import { useState } from "react";

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
        created: new Date().toLocaleString(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea name="body" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      </div>

      <button>Add note</button>
    </form>
  );
}
