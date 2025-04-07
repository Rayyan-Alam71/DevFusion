// Make sure to install the 'postgres' package
// @ts-ignore
import { drizzle } from 'drizzle-orm/postgres-js';
// @ts-ignore
import postgres from 'postgres';
import * as schema from "./schema"

const queryClient = postgres(process.env.DATABASE_URL !);
const db = drizzle(queryClient , {schema});

export {db};