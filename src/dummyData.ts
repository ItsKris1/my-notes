import { serverTimestamp } from "firebase/firestore";

export const dummyNotesData = [
  {
    title: "DummyNote1",
    body: "book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.ontaining Lorem",
    created: serverTimestamp(),
  },
  {
    title: "DummyNoteTwo",
    body: "Lorem Ipsum is that it has t here',",
    created: serverTimestamp(),
  },
  {
    title: "DummyNoteThree",
    body: "it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
    created: serverTimestamp(),
  },
];
