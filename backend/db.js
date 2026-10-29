import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});
export async function connectToDatabase() {
  try {
    await pool.connect();
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
  const res = await pool.query("SELECT NOW()");
  console.log("Database connected:", res.rows[0].now);
  return pool;
}

export default pool;
