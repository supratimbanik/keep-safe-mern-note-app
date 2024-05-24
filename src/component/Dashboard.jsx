import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./Create";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import { useSearchParams } from "react-router-dom";

function Dashboard(props) {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const email = search.get("email");
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function getNotes() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/dashboard/notes`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              email: email,
            }),
          }
        );
        const result = await response.json();
        if (!response.ok) {
          console.log(result);
        } else {
          setNotes(result.data);
        }
      } catch (err) {
        console.log("Error fetching notes: ", err);
      }
    }

    if (email) {
      getNotes();
    }
  }, [email]);

  if (!props.isLoggedIn) {
    props.logout();
    navigate("/login");
    return;
  }
  //Re-rendering on new node creation
  function handleCreate(flag) {
    if (flag) {
      // If a new note has been created, fetch the updated list of notes
      async function getUpdatedNotes() {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/dashboard/notes`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({
                email: email,
              }),
            }
          );
          const result = await response.json();
          if (!response.ok) {
            console.log(result);
          } else {
            setNotes(result.data);
          }
        } catch (err) {
          console.log("Error fetching notes: ", err);
        }
      }

      // Call the function to fetch updated notes
      getUpdatedNotes();
    }
  }

  return (
    <div className="Dashboard">
      <Header email={email ? email : "guest"} logout={props.logout} />
      <CreateArea onCreateNewNote={handleCreate} />
      {notes.map((note) => (
        <Note
          onDelete={handleCreate}
          key={note._id}
          id={note._id}
          email={note.email}
          title={note.title}
          text={note.text}
          onUpdate={handleCreate}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Dashboard;
