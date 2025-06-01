CREATE TABLE users (
  academic_id VARCHAR(10) PRIMARY KEY CHECK (academic_id ~ '^152410\d{3}$'),
  password_hash TEXT NOT NULL
);

-- Insert sample users (password = last 4 digits of ID)
INSERT INTO users (academic_id, password_hash)
VALUES 
  ('152410001', crypt('0001', gen_salt('bf'))),
  ('152410002', crypt('0002', gen_salt('bf'))),
  ('152410003', crypt('0003', gen_salt('bf'))),
  ('152410004', crypt('0004', gen_salt('bf'))),
  ('152410005', crypt('0005', gen_salt('bf'))),
  ('152410006', crypt('0006', gen_salt('bf'))),
  ('152410007', crypt('0007', gen_salt('bf'))),
  ('152410008', crypt('0008', gen_salt('bf'))),
  ('152410009', crypt('0009', gen_salt('bf'))),
  ('152410010', crypt('0010', gen_salt('bf')));