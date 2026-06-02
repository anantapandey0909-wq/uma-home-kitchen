const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

// Create configured Prisma Client instance
const prisma = new PrismaClient();

// Connection verification function
async function checkConnection() {
  try {
    // Perform simple query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connected successfully using Prisma ORM.');
  } catch (error) {
    console.error('CRITICAL: Database connection failed!');
    console.error(error.message);
    // In production, we might want to shut down, in development we let it log
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

module.exports = {
  prisma,
  checkConnection
};
