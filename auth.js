const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Login
router.post('/login', async (req, res) => {
  const { academic_id, password } = req.body;
  
  try {
    const [user] = await db.query(
      'SELECT * FROM users WHERE academic_id = ?', 
      [academic_id]
    );
    
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    res.json({ token, user: { id: user.id, academic_id: user.academic_id, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { academic_id, email, password, role, first_name, last_name } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query(
      'INSERT INTO users (academic_id, email, password_hash, role, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)',
      [academic_id, email, hashedPassword, role, first_name, last_name]
    );
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
