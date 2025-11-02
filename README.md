## 🧑‍💼 Team Task Manager App

A full-stack Team Task Manager application built using React (Vite), TailwindCSS, Node.js, Express.js, and MongoDB.
It allows users and teams to create, assign, track, and manage tasks efficiently.
Includes authentication, role-based access, and real-time task status updates.

🚀 Features
👤 Authentication

Register, Login, and Logout using JWT authentication

Role-based access for Admin, Manager, and Team Member

Protected routes for authorized users only

📋 Tasks

Create, update, and delete tasks

Assign tasks to team members

Track task status: Pending, In Progress, Completed

View all assigned and created tasks

👥 Team Management

Admins can create and manage teams

Add or remove members

Assign managers for each team

🔔 Notifications

Real-time updates when tasks are assigned or completed

Email alerts sent on task creation and updates
(Note: Emails may appear in spam due to SendGrid delays after deployment — please check your spam folder.)

📅 Dashboard

Visual overview of all tasks and progress

Filter tasks by status, priority, or assignee

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router DOM

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT for authentication

Nodemailer / SendGrid for email notifications

Multer (optional for user profile uploads)

⚙️ Installation
Step 1️⃣: Clone the repository
git clone https://github.com/your-username/team-task-manager.git

Step 2️⃣: Install dependencies
cd client
npm install
cd ../server
npm install

Step 3️⃣: Add environment variables

Create a .env file in the server/ folder and add the following:

MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_secret_key
PORT = 5000
EMAIL_USER = your_email@example.com
EMAIL_PASS = your_email_password

Step 4️⃣: Run the project

In one terminal:

cd server
npm start


In another terminal:

cd client
npm run dev

🧩 API Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
GET	/api/users	Get all team members
💡 Usage Instructions

Login as Admin → Create teams and assign managers

Login as Manager → Create and assign tasks to team members

Login as Team Member → View assigned tasks and update their status

Navigate between pages using the top navbar

Check Dashboard for task overview

🌐 Deployment

Frontend → Netlify

Backend → Render

Database → MongoDB Atlas


