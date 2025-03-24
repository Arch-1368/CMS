CREATE DATABASE church_management;
USE church_management;

-- Create the users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

show tables;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'student';
FLUSH PRIVILEGES;