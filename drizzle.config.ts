import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './db/schema.ts',
  verbose : true,
  strict : true,
  dbCredentials: {
    url: process.env.DATABASE_URL !
  }
})