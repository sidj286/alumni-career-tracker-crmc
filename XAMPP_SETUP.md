# XAMPP Setup Guide for Alumni Tracking System

## Prerequisites
- XAMPP installed on your system
- VS Code with the recommended extensions

## Step 1: Start XAMPP Services
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Ensure both services show "Running" status

## Step 2: Create Database
1. Open your browser and go to `http://localhost/phpmyadmin`
2. Click "New" to create a new database
3. Name it `alumni_tracking_system`
4. Click "Create"

## Step 3: Import Database Schema
1. Select the `alumni_tracking_system` database
2. Click on the "SQL" tab
3. Copy and paste the contents of `database/schema.sql`
4. Click "Go" to execute the SQL

## Step 4: Setup PHP Backend
1. Copy the `backend-php` folder to your XAMPP `htdocs` directory:
   ```
   C:\xampp\htdocs\alumni-tracking-api\
   ```
   (On Mac: `/Applications/XAMPP/htdocs/alumni-tracking-api/`)

2. The folder structure should look like:
   ```
   htdocs/
   └── alumni-tracking-api/
       ├── api/
       │   ├── .htaccess
       │   ├── auth/
       │   ├── alumni/
       │   ├── analytics/
       │   ├── config/
       │   └── utils/
       ```

## Step 5: Test API Connection
1. Open your browser and go to:
   ```
   http://localhost/alumni-tracking-api/api/analytics/overview
   ```
2. You should see a JSON response (might show unauthorized, which is expected)

## Step 6: Update Frontend Configuration
The frontend is already configured to connect to:
```
http://localhost/alumni-tracking-api/api
```

## Step 7: Test the Application
1. Start the React development server (already running)
2. Login with any username/password combination
3. The system will now use your local MySQL database

## Default Login Credentials
- **Username**: admin
- **Password**: Any password (demo mode)
- **Role**: Admin, Faculty, or Alumni

## Database Tables Created
- `users` - System users and authentication
- `alumni` - Alumni records and employment data
- `employment_history` - Career progression tracking
- `curriculum_suggestions` - AI and manual curriculum recommendations
- `departments` - Department reference data
- `reports` - Generated reports tracking
- `activity_logs` - System activity logging

## Troubleshooting

### MySQL Connection Issues
- Ensure MySQL service is running in XAMPP
- Check that port 3306 is not blocked
- Verify database name is `alumni_tracking_system`

### Apache Issues
- Ensure Apache is running on port 80
- Check that no other web server is using port 80
- Verify `.htaccess` file is in the correct location

### API Not Working
- Check that the `backend-php` folder is in `htdocs/alumni-tracking-api/`
- Ensure Apache has mod_rewrite enabled
- Check PHP error logs in XAMPP control panel

### CORS Issues
- The PHP files include CORS headers
- If still having issues, check browser console for specific errors

## Next Steps
1. Customize the database schema as needed
2. Implement additional API endpoints
3. Add proper password hashing in production
4. Set up proper JWT secret key
5. Add input validation and sanitization
6. Implement proper error logging

## Production Considerations
- Use environment variables for database credentials
- Implement proper password hashing with `password_hash()`
- Add input validation and sanitization
- Use a proper JWT library
- Set up SSL/HTTPS
- Implement rate limiting
- Add comprehensive error logging