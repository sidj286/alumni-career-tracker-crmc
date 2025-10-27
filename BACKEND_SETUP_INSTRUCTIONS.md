# Backend Setup Instructions

## Step 1: Copy Backend Files to XAMPP

1. **Create the API directory in XAMPP:**
   - Navigate to your XAMPP installation directory (usually `C:\xampp\htdocs\` on Windows)
   - Create a new folder called `alumni-tracking-api`
   - Inside this folder, create an `api` folder

2. **Copy the backend-php files:**
   - Copy all files from your project's `backend-php` folder to `C:\xampp\htdocs\alumni-tracking-api\`
   - Your structure should look like:
   ```
   C:\xampp\htdocs\alumni-tracking-api\
   ├── api\
   │   ├── .htaccess
   │   ├── alumni\
   │   │   └── index.php
   │   ├── analytics\
   │   │   ├── overview.php
   │   │   └── department.php
   │   ├── auth\
   │   │   └── login.php
   │   └── config\
   │       └── database.php
   └── utils\
       └── jwt.php
   ```

## Step 2: Test the API Connection

1. **Test if Apache is serving PHP files:**
   - Open your browser and go to: `http://localhost/alumni-tracking-api/api/analytics/overview`
   - You should see a JSON response (might show unauthorized, which is expected)

2. **If you get a 404 error:**
   - Make sure Apache is running in XAMPP
   - Check that the files are in the correct location
   - Verify that `.htaccess` file exists in the api folder

## Step 3: Update Database Configuration

Make sure your database configuration matches your XAMPP setup:
- Host: localhost
- Port: 3306
- Database: alumni_tracking_system
- Username: root
- Password: (empty for default XAMPP)

## Step 4: Test Database Connection

1. Go to phpMyAdmin: `http://localhost/phpmyadmin`
2. Select the `alumni_tracking_system` database
3. Check that all tables exist and have sample data

## Troubleshooting

If you still get network errors:

1. **Check Apache Error Logs:**
   - In XAMPP Control Panel, click "Logs" next to Apache
   - Look for any PHP errors

2. **Enable PHP Error Display:**
   - Add this to the top of your PHP files for debugging:
   ```php
   <?php
   error_reporting(E_ALL);
   ini_set('display_errors', 1);
   ?>
   ```

3. **Test Simple PHP File:**
   - Create a test file: `C:\xampp\htdocs\test.php`
   - Add: `<?php echo "PHP is working!"; ?>`
   - Visit: `http://localhost/test.php`