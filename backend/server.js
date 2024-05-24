const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const env = require("dotenv");
const mongoose = require("mongoose");

//Connecting database
env.config();
const db = process.env.DATABASE;

mongoose
  .connect(db)
  .then(() => {
    console.log("Connection to database successful!");
  })
  .catch((err) => {
    console.log("Connection to database failed!");
    console.error(err);
  });

const schema_login = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const login_collection = mongoose.model("user_logins", schema_login);

const schema_data = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const data_collection = mongoose.model("user_datas", schema_data);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//cors policy for connecting frontend
app.use(cors());

// Function to validate email
function isValidEmail(email) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Login data sents
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!isValidEmail(email)) {
    console.log("Invalid email address!");
    return res.status(400).send("Invalid email address!");
  }

  //Login conditions checked
  try {
    const user = await login_collection.findOne({ email: email });
    if (user) {
      const storedPassword = user.password;
      bcrypt.compare(password, storedPassword, (err, result) => {
        if (err) {
          console.log("Error comparing password");
          return res.status(500).json({ message: "Internal server error!" });
        } else {
          if (result) {
            console.log("User logged in!");
            return res.status(200).json({ message: "User logged in!" });
          } else {
            console.log("Incorrect Password!");
            res.status(400).json({ message: "Incorrect Password!" });
          }
        }
      });
    } else {
      console.log("User not found!");
      res.status(400).json({ message: "User not found!" });
    }
  } catch (err) {
    console.log("Error executing login query!");
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//Registration data sent
app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm = req.body.confirm;
  const saltRounds = 10;

  //Check if email is valid
  if (!isValidEmail(email)) {
    console.log("Invalid email address!");
    return res.status(400).send("Invalid email address!");
  }

  //Registration conditions checked
  try {
    const user = await login_collection.findOne({ email: email });
    if (user) {
      console.log("User already exists!");
      return res.status(400).json({ message: "User already exists!" });
    } else if (password !== confirm) {
      console.log("Password and confirmation do not match!");
      return res
        .status(400)
        .json({ message: "Password and confirmation do not match!" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing password!");
          return res.status(500).json({ messsage: "Internal server error!" });
        } else {
          try {
            await login_collection.create({
              email: email,
              password: hash,
            });
            return res.status(200).json({ message: "User registered!" });
          } catch (err) {
            console.log("Error registering user!");
            return res.status(500).json({ message: "Internal server error!" });
          }
        }
      });
    }
  } catch (err) {
    console.log("Error executing registiration query!");
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//Reset password data sent
app.post("/reset", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm = req.body.confirm;
  const saltRounds = 10;

  //Check if email is valid
  if (!isValidEmail(email)) {
    console.log("Invalid email address!");
    return res.status(400).send("Invalid email address!");
  }

  //Reset conditions checked
  try {
    const user = await login_collection.findOne({ email: email });
    if (user) {
      if (password !== confirm) {
        console.log("Password and confirmation do not match!");
        return res
          .status(400)
          .json({ message: "Password and confirmation do not match!" });
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.log("Error hashing password!");
            return res.status(500).json({ messsage: "Internal server error!" });
          } else {
            try {
              await login_collection.updateOne(
                {
                  email: email,
                },
                {
                  password: hash,
                }
              );
              return res
                .status(200)
                .json({ message: "User password reset done!" });
            } catch (err) {
              console.log("Error registering user!");
              return res
                .status(500)
                .json({ message: "Internal server error!" });
            }
          }
        });
      }
    } else {
      console.log("User does not exists!");
      return res.status(400).json({ message: "User does not exists!" });
    }
  } catch (err) {
    console.log("Error executing registiration query!");
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//dashboard routes

//Create note
app.post("/dashboard/create", async (req, res) => {
  const { email, title, text } = req.body;
  try {
    await data_collection.create({
      email: email,
      title: title,
      text: text,
    });
    console.log("New note data created!");
    return res.status(200).json({ message: "New note data created!" });
  } catch (err) {
    console.log("Error creating new note data!");
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//get user notes
app.post("/dashboard/notes", async (req, res) => {
  const email = req.body.email;
  try {
    const data = await data_collection.find({ email: email });

    return res.status(200).json({ data: data });
  } catch (err) {
    console.log("Error fetching user note data!");
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//delete user notes
app.post("/dashboard/delete", async (req, res) => {
  const { id, email } = req.body;
  console.log(id + " " + email);
  try {
    const deleted = await data_collection.deleteOne({ _id: id, email: email });
    if (deleted) {
      console.log("Note deleted!");
      return res.status(200).json({ message: "Note deleted!" });
    } else {
      console.log("Note not found or already deleted!");
      return res.status(400).json({ message: "Note deleted!" });
    }
  } catch (err) {
    console.log("Cannot execute delete query!");
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//update user note
app.post("/dashboard/update", async (req, res) => {
  const { id, email, title, text } = req.body;
  console.log(id + " " + email);
  try {
    const updated = await data_collection.updateOne(
      { _id: id, email: email },
      {
        $set: {
          title: title,
          text: text,
        },
      }
    );
    if (updated) {
      console.log("Note updated!");
      return res.status(200).json({ message: "Note updated!" });
    } else {
      console.log("Note not found!");
      return res.status(400).json({ message: "Note not found!" });
    }
  } catch (err) {
    console.log("Cannot execute update query!");
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//delete account route
app.post("/dashboard/account-delete", async (req, res) => {
  const email = req.body.email;
  console.log(email);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Delete login information
    const login_deleted = await login_collection.deleteMany(
      { email: email },
      { session }
    );

    // Delete associated data
    const data_deleted = await data_collection.deleteMany(
      { email: email },
      { session }
    );

    // Commit the transaction if both delete operations are successful
    await session.commitTransaction();
    session.endSession();

    // Check if both login and data deletion were successful
    if (login_deleted && data_deleted) {
      console.log("Account deleted!");
      return res.status(200).json({ message: "Account deleted!" });
    } else {
      console.log("Account not found or already deleted!");
      return res
        .status(400)
        .json({ message: "Account not found or already deleted!" });
    }
  } catch (err) {
    // Abort transaction if any error occurs
    await session.abortTransaction();
    session.endSession();

    console.log("Cannot execute delete query!");
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
