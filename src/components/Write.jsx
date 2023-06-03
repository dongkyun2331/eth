import { useRef } from "react";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Write() {
  const navigate = useNavigate();
  const detailRef = useRef();

  async function onWrite(e) {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "notes"), {
      detail: detailRef.current.value,
      date: serverTimestamp(),
    });
    navigate("/");
  }

  function goBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className="write">
      <div className="buttons">
        <button onClick={onWrite}>Save</button>
        <button onClick={goBack}>Cancel</button>
      </div>
      <form>
        <div>
          <textarea ref={detailRef}></textarea>
        </div>
      </form>
    </div>
  );
}

export default Write;
