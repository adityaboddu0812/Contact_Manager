# Contact Manager Backend

Simple Node.js + Express backend for the Contact Manager application.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create a `.env` file in the `server` directory:
```
MONGODB_URI=mongodb://localhost:27017/contact_manager
PORT=5000
```

3. Make sure MongoDB is running (local or Atlas)

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `POST /api/contacts` - Create a new contact
- `GET /api/contacts` - Get all contacts (newest first)
- `DELETE /api/contacts/:id` - Delete a contact

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (required)
- `PORT` - Server port (default: 5000)
