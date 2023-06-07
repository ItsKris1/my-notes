import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./server/firebase";
import { NoteData } from "./App";

export function useNotes(): [NoteData[], React.Dispatch<React.SetStateAction<NoteData[]>>] {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("created"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      console.log("Got data");
      const newNotes: NoteData[] = [];
      querySnapShot.forEach((doc) => {
        console.log("Time", doc.data().created);
        let date;

        if (doc.data().created) {
          date = new Date(doc.data().created.seconds * 1000).toLocaleDateString();
        } else {
          date = "Loading...";
        }
        newNotes.push({ ...(doc.data() as NoteData), id: doc.id, selected: false, created: date });
      });

      setNotes(newNotes);

      return () => unsubscribe();
    });
  }, []);

  return [notes, setNotes];
}

const dummyData = [
  {
    title: "dummy1",
    body: "dummy1 body",
  },
  {
    title: "dummy2",
    body: "dummy2 body",
  },
];
