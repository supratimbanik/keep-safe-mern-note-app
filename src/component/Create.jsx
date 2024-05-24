import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function CreateArea(props) {
  const [searchParams] = useSearchParams("");
  const email = searchParams.get("email");

  //State for note input
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  //Input change
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "content") {
      setText(value);
    }
  }

  //Handling add button
  async function handleClick(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/dashboard/create`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            email: email ? email : "",
            title: title,
            text: text,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      props.onCreateNewNote(true);
    } catch (err) {
      console.log("Error sending new note to server!");
      alert("Error sending new note to server!");
    }
  }
  return (
    <div>
      <form className="create">
        <input
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Take a note..."
          rows="3"
          value={text}
        />
        <button
          onClick={(event) => {
            handleClick(event);
            setTitle("");
            setText("");
          }}
        >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
