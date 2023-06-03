import { useEffect, useState } from "react";
import Note from "./Note";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setNotes(items);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ul className="list">
      {notes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </ul>
  );
}
