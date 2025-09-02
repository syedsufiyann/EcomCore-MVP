const express = require('express');
const { Pool } = require('pg'); // Import Pool for PostgreSQL connection

const app = express();
const port = 3000;

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: 'your_username',        // From .devcontainer/docker-compose.yml
  host: 'db',                   // Service name from .devcontainer/docker-compose.yml
  database: 'your_database_name', // From .devcontainer/docker-compose.yml
  password: 'your_password',    // From .devcontainer/docker-compose.yml
  port: 5432,                   // Default PostgreSQL port
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release(); // Release the client back to the pool
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('PostgreSQL connected! Current time:', result.rows[0].now);
  });
});

app.get('/', (req, res) => {
  res.send('Hello from your EcomCore-MVP Express App with PostgreSQL!');
});

// Example API endpoint to fetch data from PostgreSQL
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); // Assuming you have a 'users' table
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.stack);
    res.status(500).send('Error fetching users');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});