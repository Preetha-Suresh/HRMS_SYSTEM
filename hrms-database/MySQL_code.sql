-- Drop old tables if needed
DROP DATABASE IF EXISTS hrms_db;

-- Create the main database
CREATE DATABASE hrms_db;
USE hrms_db;

-- 1. Users Table: For login/authentication
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('HR', 'EMPLOYEE') NOT NULL,
  name VARCHAR(100),
  department VARCHAR(50),
  contact VARCHAR(50)
);

-- 2. Employee Table: Directory info
CREATE TABLE employee (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(15),
  department VARCHAR(50),
  role VARCHAR(50),
  status VARCHAR(20)
);

-- 3. Leave Requests: With employee name and status
CREATE TABLE leave_request (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(10),
  employee_name VARCHAR(100),
  leave_date DATE,
  reason TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  status ENUM('Pending', 'Approved', 'Rejected'),
  FOREIGN KEY (employee_id) REFERENCES employee(id)
);

-- 4. Payroll Table: With employee name and salary details
CREATE TABLE payroll (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(10),
  employee_name VARCHAR(100),
  month VARCHAR(7),  -- Format: YYYY-MM
  basic DECIMAL(10,2),
  allowance DECIMAL(10,2),
  deduction DECIMAL(10,2),
  status VARCHAR(20),
  FOREIGN KEY (employee_id) REFERENCES employee(id)
);

-- 5. Job Postings
CREATE TABLE job_posting (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  position VARCHAR(100),
  department VARCHAR(50),
  location VARCHAR(50),
  type VARCHAR(50),
  posted DATE,
  status VARCHAR(20)
);

-- 6. Candidates for Job Postings
CREATE TABLE candidate (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  job_id BIGINT,
  name VARCHAR(100),
  contact VARCHAR(100),
  FOREIGN KEY (job_id) REFERENCES job_posting(id)
);

USE hrms_db;
SELECT * FROM USERS;
SELECT * FROM EMPLOYEE;
SELECT * FROM LEAVE_REQUEST;
SELECT * FROM PAYROLL;
SELECT * FROM JOB_POSTING;
SELECT * FROM CANDIDATE;
