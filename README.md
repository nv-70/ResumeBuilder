# Resume Builder

Resume Builder is a full-stack web application that allows users to create, edit, and download professional resumes. It provides a simple and intuitive interface for adding personal information, skills, education, projects, and customizing resume themes. This project is ideal for anyone who wants to generate resumes quickly and efficiently.

## Features

- User authentication (signup and login)
- Create and edit resume sections (profile, skills, education, experience, projects)
- Theme customization for resumes
- Upload and manage profile images
- Download resume in PDF format
- Responsive design for desktops, tablets, and mobile devices

## Tech Stack

### Frontend
- React.js
- Context API for state management
- Axios for API communication
- CSS / TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads

## Project Structure

## Installation and Setup

### Clone the repository
```bash
git clone https://github.com/nv-70/ResumeBuilder.git
cd resume-builder
Install dependencies

Backend

cd Backend
npm install


Frontend

cd ../Frontend
npm install

Configure environment variables

Create a .env file in the Backend folder with the following content:

PORT=4000
MONGO_URI=mongodb+srv://nv571020:resume123@cluster0.i9kffjk.mongodb.net/RESUME

JWT_SECRET = "hexa"

Run the project

Start backend

cd Backend
npm start


Start frontend

cd ../Frontend
npm run dev


Open the application in your browser at http://localhost:5173
.

Deployment

This project is deployed in Render .

License

This project is licensed under the MIT License.




