import Update from "./Update";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

function Note(props) {
  const [edit, setEdit] = useState(false);

  async function handleDelete() {
    const confirm = window.confirm(
      "Are you sure you want to delete the note? Once deleted it cannot be retieved."
    );
    if (!confirm) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/dashboard/delete`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            id: props.id,
            email: props.email,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.log(result);
        return;
      } else {
        props.onDelete(true);
      }
    } catch (err) {
      console.log("Error deleting note! ");
    }
  }

  return (
    <div className="Note">
      <h1>{props.title}</h1>
      <p>{props.text}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button>
        <EditIcon
          onClick={() => {
            setEdit(true);
          }}
        />
      </button>
      <Update
        id={props.id}
        email={props.email}
        title={props.title}
        text={props.text}
        edit={edit}
        onClose={() => setEdit(false)}
        onUpdate={() => {
          props.onUpdate(true);
        }}
      />
    </div>
  );
}

export default Note;
