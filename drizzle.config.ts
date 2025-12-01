/* import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/user.ts',  // Path to your schema file(s); use a glob like './src/db/schema/*.ts' if you have multiple
  //out: './drizzle',  // Optional: Directory for generated migrations (defaults to './drizzle')
  dbCredentials: {
    url:process.env.DATABASE_URL
  },
  migrations: {
    table: 'my-migrations-table', // `__drizzle_migrations` by default
    schema: 'public', // used in PostgreSQL only, `drizzle` by default
  }, 
}); */



import { defineConfig } from 'drizzle-kit';
import 'dotenv/config'
console.log(process.env.DATABASE_URL);
if (!process.env.DATABASE_URL) {
  throw new Error('not found');
}
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  // driver: 'pg',
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  migrations: {
    schema: 'drizzle',      // migration table goes here
    table: '__migrations',
  },
  // THIS IS CRITICAL:
 // schemaFilter: ['drizzle'], // Only allow tables in 'drizzle' schema
});