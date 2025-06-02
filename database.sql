-- Create database
CREATE DATABASE virtual_classroom;
USE virtual_classroom;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  academic_id VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student', 'teacher', 'admin') NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  teacher_id INT NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

-- Attendance table
CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late') NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Assignments table
CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  due_date DATETIME NOT NULL,
  max_score INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Student submissions
CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT NOT NULL,
  student_id INT NOT NULL,
  submission_date DATETIME NOT NULL,
  file_path VARCHAR(255),
  score INT,
  feedback TEXT,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (academic_id, email, password_hash, role, first_name, last_name) VALUES
('152410001', 'student1@school.edu', '$2a$10$XlzY7.5UZUaZ6sYbJkq8Uu7tGf3JjZ1VWnY9rNcXd3vQmKpLbHsDy', 'student', 'John', 'Doe'),
('152410002', 'student2@school.edu', '$2a$10$XlzY7.5UZUaZ6sYbJkq8Uu7tGf3JjZ1VWnY9rNcXd3vQmKpLbHsDy', 'student', 'Jane', 'Smith'),
('T1001', 'teacher1@school.edu', '$2a$10$XlzY7.5UZUaZ6sYbJkq8Uu7tGf3JjZ1VWnY9rNcXd3vQmKpLbHsDy', 'teacher', 'Robert', 'Johnson'),
('A1001', 'admin@school.edu', '$2a$10$XlzY7.5UZUaZ6sYbJkq8Uu7tGf3JjZ1VWnY9rNcXd3vQmKpLbHsDy', 'admin', 'Admin', 'User');

INSERT INTO courses (course_code, name, description, teacher_id) VALUES
('CS101', 'Introduction to Computer Science', 'Basic computer science concepts', 3),
('MATH201', 'Advanced Mathematics', 'Higher level mathematics course', 3);

INSERT INTO attendance (student_id, course_id, date, status) VALUES
(1, 1, '2023-10-01', 'present'),
(2, 1, '2023-10-01', 'late'),
(1, 2, '2023-10-02', 'present');

INSERT INTO assignments (course_id, title, description, due_date, max_score) VALUES
(1, 'Programming Assignment 1', 'Basic Python programming', '2023-11-15 23:59:59', 100),
(2, 'Math Problem Set 1', 'Advanced calculus problems', '2023-11-20 23:59:59', 100);
