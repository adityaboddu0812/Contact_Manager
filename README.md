# Contact Manager

A full-stack Contact Management Web Application built with React (Vite) frontend and Node.js + Express + MongoDB backend.

## Features

- Add new contacts with name, email, phone, and optional message
- View all contacts in a responsive table/card layout
- Delete contacts with confirmation dialog
- Sort contacts by name (A-Z, Z-A) or date (newest/oldest first)
- Real-time updates when contacts are added or deleted

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- shadcn-ui components
- React Router

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- CORS enabled

## Project Structure

```
contact_manager/
├── src/                    # Frontend React code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   └── ...
├── server/                 # Backend code
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── server.js          # Express server
└── ...
```

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB (local or MongoDB Atlas account)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `server/` directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to project root:
```bash
cd contact_manager
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in project root:
```
VITE_API_BASE_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

- `POST /api/contacts` - Create a new contact
- `GET /api/contacts` - Get all contacts (newest first by default)
- `DELETE /api/contacts/:id` - Delete a contact

## Development

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## License

ISC
