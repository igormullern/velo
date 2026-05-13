import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const projectId = process.env.VITE_SUPABASE_PROJECT_ID;
const password = process.env.VITE_SUPABASE_DB_PASSWORD;

async function test() {
  const localString = `postgresql://postgres:postgres@127.0.0.1:54322/postgres`;
  const remoteString = `postgresql://postgres.${projectId}:${password}@aws-0-sa-east-1.pooler.supabase.com:6543/postgres`;
  
  for (const connectionString of [localString, remoteString]) {
    console.log("Trying:", connectionString);
    const pool = new Pool({ connectionString });
    try {
      const res = await pool.query('SELECT 1');
      console.log("Connection successful:", connectionString);
      await pool.end();
      return;
    } catch (e) {
      console.error("Failed:", e.message);
      await pool.end();
    }
  }
}

test();
