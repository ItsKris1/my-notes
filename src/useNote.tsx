import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./server/firebase";
import { NoteData } from "./App";

export function useNotes(): [NoteData[], React.Dispatch<React.SetStateAction<NoteData[]>>] {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const newNotes: NoteData[] = [];
      querySnapShot.forEach((doc) => {
        console.log("data", doc.data().created.seconds * 1000);
        const date = new Date(doc.data().created.seconds * 1000);
        newNotes.push({ ...(doc.data() as NoteData), id: doc.id, selected: false, created: date.toLocaleString() });
      });

      setNotes(newNotes);

      return () => unsubscribe();
    });
  }, []);

  return [notes, setNotes];
}
