import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect } from "react";

function Update(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);

  // Synchronize open state with edit prop
  useEffect(() => {
    setOpen(props.edit);
  }, [props.edit]);

  //Handle input change
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "text") {
      setText(value);
    }
  }

  //handle update request
  async function handleUpdate() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/dashboard/update`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            id: props.id,
            email: props.email,
            title: title,
            text: text,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.log(result);
        return;
      } else {
        props.onUpdate();
      }
    } catch (err) {
      console.log("Error updating note!");
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          props.onClose();
        }}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiDialog-paper": { minHeight: "200px", minWidth: "200px" } }}
      >
        <DialogTitle style={{ width: "100%" }}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
            style={{ width: "100%", fontSize: "1.2rem", fontWeight: "bold" }}
          />
        </DialogTitle>
        <DialogContentText>
          <textarea
            rows={4}
            name="text"
            onChange={handleChange}
            style={{ marginLeft: "2.5%", width: "95%", fontSize: "1.2rem" }}
            value={text}
          ></textarea>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              props.onClose();
            }}
          >
            <CloseIcon />
          </Button>
          <Button
            onClick={() => {
              handleUpdate();
              setOpen(false);
              props.onClose();
            }}
          >
            <CheckIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Update;
