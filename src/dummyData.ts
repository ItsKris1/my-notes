import { serverTimestamp } from "firebase/firestore";

export const dummyNotesData = [
  {
    title: "Lorem Ipsum is simply dummy text",
    body: "book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
    created: serverTimestamp(),
  },
  {
    title: "Lorem Ipsum",
    body: "Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',",
    created: serverTimestamp(),
  },
  {
    title: "It is a long",
    body: "it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
    created: serverTimestamp(),
  },
];
