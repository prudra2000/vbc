import { PrismaClient } from "@prisma/client/edge";  // Use the edge version of PrismaClient
import { Pool } from "@neondatabase/serverless";  // Import Neon adapter

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Neon DB connection string
});

// Initialize Prisma client without custom pool
export const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  }
});

// Use the pool for custom queries if needed
export { pool };
