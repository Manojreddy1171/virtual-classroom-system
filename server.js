const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'virtual_classroom',
  password: 'your_password',
  port: 5432,
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { academic_id, password } = req.body;
  const lastFourDigits = academic_id.slice(-4);

  if (password !== lastFourDigits) {
    return res.status(401).json({ error: 'Password must be last 4 digits of Academic ID' });
  }

  const result = await pool.query(
    'SELECT * FROM users WHERE academic_id = $1 AND password_hash = crypt($2, password_hash)',
    [academic_id, lastFourDigits]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid Academic ID/Password' });
  }
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));