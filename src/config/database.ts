// Database configuration for MySQL with XAMPP
export const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // Default XAMPP MySQL password is empty
  database: 'alumni_tracking_system',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000
};

// API base URL for your local XAMPP server
export const API_BASE_URL = '/api';