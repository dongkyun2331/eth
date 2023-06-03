import { MdDelete } from "react-icons/md";
import moment from "moment";
import "moment/locale/ko";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

function Note() {
  const date = moment(note.date.toDate()).format("YYYY-MM-D h:mm");

  async function onDelete() {
    if (window.confirm("Really?")) {
      await deleteDoc(doc(db, "notes", note.id));
    }
  }
  return (
    <li className="note">
      <div className="top">
        <div className="date">{date}</div>
        <div className="btns">
          <span>
            <MdDelete onClick={onDelete} />
          </span>
        </div>
      </div>
      <div className="content">
        <p>{note.detail}</p>
      </div>
    </li>
  );
}

export default Note;
