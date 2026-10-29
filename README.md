Run locally:

1. Install PostgreSQL:
   User: `postgres`
   Password: `12345678`
   Database: `db`
   Host: `localhost`
   Port: `5432`
   1. Create the user and database:
      `CREATE USER <postgres> WITH PASSWORD '<12345678>';`
      `CREATE DATABASE <db> OWNER <postgres>;`

   2. Create the table:
      `psql -U <db_user> -d <db_name> -f schema.sql`

2. Open two terminals in the project directory:
   `cd backend`
   `cd frontend`

3. Install dependencies:
   `npm install`

4. Create a .env file in frontend directory and add this variable:
   VITE_BACKEND_BASE_URL=http://localhost:3000

5. Create a .env file in baceknd directory and add these variables:
   DATABASE_URL=postgresql://{username}:{password}@{host}:{port}/{database_name}
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
