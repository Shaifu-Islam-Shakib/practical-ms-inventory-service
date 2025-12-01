import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import 'dotenv/config'
if (!process.env.DATABASE_URL) {
  throw new Error('not found');
}
import {schema} from './schema/index.ts'
const client = new Client({
  connectionString: process.env.DATABASE_URL
})
client.connect()
const db = drizzle(client, { schema: schema })
export default db;