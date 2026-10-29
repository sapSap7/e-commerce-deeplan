Run locally:

1. Install PostgreSQL
   username: postgres
   password: 12345678
   database name: db
   port: 5432

2. Open two terminals in the project directory:
   `cd backend`
   `cd frontend`

3. Install dependencies:
   `npm install`

4. Create a .env file in frontend directory and add this variable:
   VITE_BACKEND_BASE_URL=http://localhost:3000

5. Create a .env file in baceknd directory and add these variables:
   DATABASE_URL=postgresql://{username}:{password}@localhost:{port}/{database_name}
   PORT=3000

6. Start the backend server:
   `node index.js` ---> should print :
   "Server is running on port 3000
   Database connected: 2026-10-29T15:28:11.307Z
   Database connection established."

7. Start the frontend server:
   `npm run dev` ---> should print:
   http://localhost:5173/

8. Open the local URL printed in the terminal.
