import pg from 'pg';
import fs from 'fs';

const { Client } = pg;

async function dbconnect() {
  // Azure PostgreSQL connection string
  const username = 'VarunKarthik';
  const password = 'CBEtoCEG#13';
  const host = 'journey.postgres.database.azure.com';
  const port = 5432;
  const databaseName = 'srv';

  const connectionString = `postgres://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${databaseName}?ssl=true`;

  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync('Journey-App/ca_certificate.pem') // Path to your CA certificate file
    }
  });

  try {
    await client.connect();
    console.log('Connected to Azure PostgreSQL');
    return client; // Return the connected client
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Throw an error for the caller to handle
  }
}

export { dbconnect };
