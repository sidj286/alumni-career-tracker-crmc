# Backend Troubleshooting Guide

## Step 1: Check XAMPP Services
1. Open XAMPP Control Panel
2. Make sure both **Apache** and **MySQL** are running (green status)
3. If not running, click "Start" for both services

## Step 2: Test Basic PHP
Create a test file to verify PHP is working:

1. Create a file: `C:\xampp\htdocs\test.php`
2. Add this content:
```php
<?php
echo "PHP is working!";
phpinfo();
?>
```
3. Visit: `http://localhost/test.php`
4. You should see "PHP is working!" and PHP information

## Step 3: Test Your API Directory
1. Visit: `http://localhost/alumni-tracking-api/`
2. You should see a directory listing or an index page

## Step 4: Check .htaccess File
Make sure the `.htaccess` file exists in: `C:\xampp\htdocs\alumni-tracking-api\api\.htaccess`

If it doesn't exist, create it with this content:
```apache
RewriteEngine On

# Handle CORS preflight requests
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]

# Route API requests
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Analytics routes
RewriteRule ^analytics/overview/?$ analytics/overview.php [L,QSA]
RewriteRule ^analytics/department/([^/]+)/?$ analytics/department.php/$1 [L,QSA]

# Alumni routes
RewriteRule ^alumni/?$ alumni/index.php [L,QSA]
RewriteRule ^alumni/([0-9]+)/?$ alumni/index.php/$1 [L,QSA]

# Auth routes
RewriteRule ^auth/login/?$ auth/login.php [L,QSA]
```

## Step 5: Enable mod_rewrite in Apache
1. Open: `C:\xampp\apache\conf\httpd.conf`
2. Find the line: `#LoadModule rewrite_module modules/mod_rewrite.so`
3. Remove the `#` to uncomment it: `LoadModule rewrite_module modules/mod_rewrite.so`
4. Save the file and restart Apache in XAMPP

## Step 6: Test Direct PHP File Access
Try accessing the PHP file directly:
`http://localhost/alumni-tracking-api/api/analytics/overview.php`

## Step 7: Check Database Connection
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Make sure the database `alumni_tracking_system` exists
3. Check if it has the required tables

## Step 8: Check PHP Error Logs
1. In XAMPP Control Panel, click "Logs" next to Apache
2. Look for any PHP errors in the error log

## Common Issues and Solutions:

### Issue: "Not Found" Error
- **Solution**: Enable mod_rewrite and check .htaccess file

### Issue: "Internal Server Error"
- **Solution**: Check PHP syntax errors in your files
- Check Apache error logs

### Issue: Database Connection Failed
- **Solution**: Make sure MySQL is running
- Verify database credentials in `config/database.php`

### Issue: CORS Errors
- **Solution**: Make sure CORS headers are included in PHP files

## Quick Fix: Test Without URL Rewriting
If URL rewriting is not working, try accessing the file directly:
`http://localhost/alumni-tracking-api/api/analytics/overview.php`

This should work even without .htaccess configuration.