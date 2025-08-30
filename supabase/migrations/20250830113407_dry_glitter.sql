-- Alumni Tracking System Database Schema
-- Run this in phpMyAdmin or MySQL Workbench

CREATE DATABASE IF NOT EXISTS alumni_tracking_system;
USE alumni_tracking_system;

-- Users table for authentication and role management
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'faculty', 'alumni') NOT NULL,
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Alumni table for storing graduate information
CREATE TABLE alumni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    student_id VARCHAR(20),
    department VARCHAR(100) NOT NULL,
    graduation_year YEAR NOT NULL,
    degree_type ENUM('Bachelor', 'Master', 'PhD') DEFAULT 'Bachelor',
    gpa DECIMAL(3,2),
    current_position VARCHAR(150),
    company VARCHAR(150),
    industry VARCHAR(100),
    is_in_field BOOLEAN DEFAULT TRUE,
    salary DECIMAL(10,2),
    location VARCHAR(100),
    employment_status ENUM('employed', 'unemployed', 'self_employed', 'further_education') DEFAULT 'employed',
    linkedin_url VARCHAR(255),
    phone VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Employment history table for tracking career progression
CREATE TABLE employment_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumni_id INT NOT NULL,
    position VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    industry VARCHAR(100),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    salary DECIMAL(10,2),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alumni_id) REFERENCES alumni(id) ON DELETE CASCADE
);

-- Curriculum suggestions table
CREATE TABLE curriculum_suggestions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    department VARCHAR(100) NOT NULL,
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    status ENUM('pending', 'approved', 'implemented', 'rejected') DEFAULT 'pending',
    is_ai_generated BOOLEAN DEFAULT FALSE,
    rationale TEXT,
    implementation_plan TEXT,
    expected_impact_percentage DECIMAL(5,2),
    affected_students_count INT,
    implementation_timeline VARCHAR(50),
    created_by INT,
    reviewed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- Departments table for reference
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    head_of_department VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports table for tracking generated reports
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    type ENUM('overview', 'department', 'employment', 'curriculum') NOT NULL,
    department VARCHAR(100),
    parameters JSON,
    file_path VARCHAR(255),
    generated_by INT NOT NULL,
    download_count INT DEFAULT 0,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (generated_by) REFERENCES users(id)
);

-- Activity logs for system tracking
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert default departments
INSERT INTO departments (name, code, description) VALUES
('Computer Science', 'CS', 'Computer Science and Information Technology programs'),
('Business Administration', 'BA', 'Business and Management programs'),
('Engineering', 'ENG', 'Engineering and Technical programs'),
('Psychology', 'PSY', 'Psychology and Behavioral Sciences'),
('Hospitality Management', 'HM', 'Hospitality and Tourism Management');

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password_hash, role, department) VALUES
('admin', 'admin@university.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'Administration');

-- Insert sample faculty users
INSERT INTO users (username, email, password_hash, role, department) VALUES
('prof.johnson', 'sarah.johnson@university.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'faculty', 'Computer Science'),
('dr.chen', 'michael.chen@university.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'faculty', 'Business Administration'),
('prof.wilson', 'robert.wilson@university.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'faculty', 'Engineering');

-- Insert sample alumni data
INSERT INTO alumni (name, email, student_id, department, graduation_year, current_position, company, is_in_field, salary, location, employment_status) VALUES
('John Doe', 'john.doe@email.com', 'CS2022001', 'Computer Science', 2022, 'Software Engineer', 'TechCorp Inc', TRUE, 75000.00, 'San Francisco, CA', 'employed'),
('Jane Smith', 'jane.smith@email.com', 'BA2021002', 'Business Administration', 2021, 'Marketing Manager', 'Marketing Solutions LLC', TRUE, 65000.00, 'New York, NY', 'employed'),
('Mike Johnson', 'mike.johnson@email.com', 'ENG2023003', 'Engineering', 2023, 'Civil Engineer', 'BuildRight Construction', TRUE, 68000.00, 'Chicago, IL', 'employed'),
('Sarah Williams', 'sarah.williams@email.com', 'PSY2020004', 'Psychology', 2020, 'Sales Representative', 'SalesForce Pro', FALSE, 55000.00, 'Austin, TX', 'employed'),
('David Brown', 'david.brown@email.com', 'CS2022005', 'Computer Science', 2022, 'Data Analyst', 'DataCorp Analytics', TRUE, 70000.00, 'Seattle, WA', 'employed'),
('Emily Davis', 'emily.davis@email.com', 'HM2021006', 'Hospitality Management', 2021, 'Hotel Manager', 'Grand Resort Hotels', TRUE, 58000.00, 'Miami, FL', 'employed'),
('Alex Rodriguez', 'alex.rodriguez@email.com', 'CS2023007', 'Computer Science', 2023, 'DevOps Engineer', 'CloudTech Solutions', TRUE, 78000.00, 'Austin, TX', 'employed'),
('Lisa Anderson', 'lisa.anderson@email.com', 'BA2022008', 'Business Administration', 2022, 'Financial Analyst', 'InvestCorp', TRUE, 62000.00, 'Boston, MA', 'employed');

-- Insert sample curriculum suggestions
INSERT INTO curriculum_suggestions (title, description, department, priority, status, is_ai_generated, rationale, implementation_plan, expected_impact_percentage, affected_students_count, implementation_timeline, created_by) VALUES
('Add Data Science Specialization Track', 'Based on alumni career trends, 34% of CS graduates are working in data-related roles. Adding a specialized track would better prepare students.', 'Computer Science', 'High', 'pending', TRUE, 'Analysis shows high demand for data scientists and machine learning engineers among CS alumni employment data.', 'Add 3 new courses: Advanced Statistics, Machine Learning, and Big Data Analytics', 15.00, 120, '6 months', 1),
('Strengthen Cybersecurity Curriculum', 'Alumni survey indicates 28% moved into cybersecurity roles within 2 years of graduation, but many lacked foundational security knowledge.', 'Computer Science', 'High', 'approved', TRUE, 'Industry demand for cybersecurity professionals is growing 15% annually, and our alumni are transitioning into these roles.', 'Enhance existing networking courses with security modules and add dedicated cybersecurity elective', 22.00, 95, '4 months', 1),
('Digital Marketing Module for Business Students', 'Business alumni working in marketing roles report insufficient digital marketing knowledge despite high industry demand.', 'Business Administration', 'Medium', 'pending', TRUE, '42% of business alumni work in marketing-related roles, but only 18% feel adequately prepared for digital marketing challenges.', 'Add digital marketing modules to existing marketing courses covering SEO, social media, and analytics', 18.00, 180, '3 months', 1);

-- Create indexes for better performance
CREATE INDEX idx_alumni_department ON alumni(department);
CREATE INDEX idx_alumni_graduation_year ON alumni(graduation_year);
CREATE INDEX idx_alumni_is_in_field ON alumni(is_in_field);
CREATE INDEX idx_employment_history_alumni_id ON employment_history(alumni_id);
CREATE INDEX idx_curriculum_suggestions_department ON curriculum_suggestions(department);
CREATE INDEX idx_curriculum_suggestions_status ON curriculum_suggestions(status);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);