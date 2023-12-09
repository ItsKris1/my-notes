import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./server/firebase";
import { NoteData } from "./App";

export function useNotes(): [
  NoteData[],
  React.Dispatch<React.SetStateAction<NoteData[]>>
] {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("created"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const newNotes: NoteData[] = [];

      if (!querySnapShot.metadata.hasPendingWrites) {
        querySnapShot.forEach((doc) => {
          newNotes.push({
            ...(doc.data() as NoteData),
            id: doc.id,
            selected: false,
            created: "",
          });
        });

        setNotes(newNotes);
      }
    });
    return () => unsubscribe();
  }, []);

  return [notes, setNotes];
}
