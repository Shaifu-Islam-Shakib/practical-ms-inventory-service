import { Pool } from 'pg'
import { drizzle } from "drizzle-orm/node-postgres"
import 'dotenv/config'
import { migrate } from "drizzle-orm/node-postgres/migrator"
if (!process.env.DATABASE_URL) {
  throw new Error('Not found');
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
const db = drizzle({ client: pool })
const main = async () => {
  console.log('migration started');
  await migrate(db, { migrationsFolder: "drizzle" })
  console.log('migration end');
  process.exit(0)
}
main().catch((error) => {
  console.log('Promise Catch:', error);
  process.exit(0)
})