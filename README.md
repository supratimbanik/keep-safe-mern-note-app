# KeepSafe

KeepSafe is a web application designed to help users keep their notes safe and organized. It allows users to create, update, and delete notes securely.

[Click here](https://keep-safe-notes.netlify.app) to visit the website.

# About

KeepSafe is a simple and secure note-taking application that prioritizes user privacy and data protection. It was developed with the intention of providing users with a reliable platform to store their personal notes, ideas, and reminders without worrying about unauthorized access.

## Features

- **Create Notes:** Users can create new notes by providing a title and content. Notes are saved securely in the application.
- **Update Notes:** Users can edit the title and content of existing notes.
- **Delete Notes:** Users can delete notes they no longer need. A confirmation dialog is displayed before deleting to prevent accidental deletions.
- **User Authentication:** Users can log in to the application to access their notes. Each user's notes are associated with their account.
- **Responsive Design:** The application is designed to be responsive and works well on various devices and screen sizes.

## Technologies Used

- **React:** The frontend of the application is built using React, a popular JavaScript library for building user interfaces.
- **Material-UI:** Material-UI is used for styling the components, providing a clean and modern user interface.
- **Node.js:** The backend of the application is built using Node.js, a server-side JavaScript runtime environment.
- **Express:** Express.js is used as the web application framework for Node.js, providing a robust set of features for building web applications.
- **MongoDB:** MongoDB is used as the database to store user information and notes securely.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/supratimbanik/keep-safe-mern-note-app.git
   ```

2. Install dependencies:

   ```bash
   cd KeepSafe
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```
   REACT_APP_BASE_URL=<base-url>
   ```

   Replace `<base-url>` with the base URL of your backend server.

4. Start the application:

   ```bash
   cd src
   npm start
   ```

   This will start the frontend server.

## Backend Setup

To set up the backend server,

1. Create a `.env` file in the `backend` directory and add the following variables:

   ```
   DATABASE=<database-api-key>
   ```

   Replace `<database-api-key>` with the your mongodb database api URI.

2. Start the server application:

   ```bash
   cd backend
   node server.js
   ```

## Usage

1. Register or log in to the application.
2. Create new notes by providing a title and content.
3. Update existing notes by clicking on the edit icon.
4. Delete notes by clicking on the delete icon.
5. Log out of the application when done.

## Contributors

- Supratim Banik (https://github.com/supratimbanik)

## License

Copyright (c) [Supratim Banik]
