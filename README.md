
# MERN Stack To-Do Application

This is a To-Do application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to manage projects and todos, including adding, updating, deleting, and exporting project summaries.


## Features

- User authentication with JWT.
- Create, read, update, and delete projects and todos.
- Mark todos as completed or pending.
- Export project summaries as Markdown files.
- Export project summaries as secret gists on GitHub.
- Responsive design using Tailwind CSS.

## Technologies Used

- **Frontend:**
  - React.js
  - Axios
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## Installation

To set up and run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or above)
- npm (Node Package Manager)
- MongoDB (running locally or use a cloud provider like MongoDB Atlas)
- A GitHub account (for exporting gists)

### Clone the Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```plaintext
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the React application:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Create a new user account or log in with existing credentials.
3. Create projects and manage todos within those projects.
4. You can export project summaries as Markdown files or as secret gists on GitHub by entering your GitHub token.

### Example API Endpoints

Here are some example API endpoints used in the application:

- **Authentication:**
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Log in a user.

- **Projects:**
  - `GET /api/projects`: Get all projects.
  - `GET /api/projects/:id`: Get project details by ID.
  - `POST /api/projects`: Create a new project.
  - `PUT /api/projects/:id`: Update project details by ID.
  - `DELETE /api/projects/:id`: Delete a project by ID.

- **Todos:**
  - `GET /api/projects/:projectId/todos`: Get all todos for a specific project.
  - `POST /api/projects/:projectId/todos`: Create a new todo for a specific project.
  - `PUT /api/projects/:projectId/todos/:todoId`: Update a specific todo.
  - `DELETE /api/projects/:projectId/todos/:todoId`: Delete a specific todo.
