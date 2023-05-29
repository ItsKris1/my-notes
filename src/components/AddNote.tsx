import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
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
  );
}
