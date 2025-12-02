# CRMC Alumni Tracking System

A simple HTML/CSS/JavaScript/PHP system for tracking alumni career outcomes at Cebu Roosevelt Memorial Colleges.

## Features

- **Role-based Access Control**: Admin, Dean, and Alumni roles
- **Alumni Management**: Add, view, and manage alumni records
- **Department Analytics**: Track employment outcomes by department
- **Curriculum Suggestions**: AI-powered curriculum recommendations
- **Reports Generation**: Generate various analytical reports
- **User Management**: Manage system users and permissions

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Database**: MySQL 8.0
- **Server**: Apache (via XAMPP)
- **Icons**: Font Awesome 6.0

## Installation

### Prerequisites
- XAMPP (Apache + MySQL + PHP)
- Web browser

### Setup Instructions

1. **Install XAMPP**
   - Download and install XAMPP from https://www.apachefriends.org/
   - Start Apache and MySQL services

2. **Setup Database**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create database named `alumni_tracking_system`
   - Import the database schema from your existing database

3. **Deploy Application**
   - Copy all files to `C:\xampp\htdocs\alumni-tracking-system\`
   - Ensure the folder structure is:
   ```
   htdocs/alumni-tracking-system/
   ├── index.html
   ├── assets/
   │   ├── css/style.css
   │   ├── js/app.js
   │   └── images/
   └── api/
       ├── config/database.php
       ├── auth/
       └── alumni/
   ```

4. **Access Application**
   - Open browser and go to: http://localhost/alumni-tracking-system/
   - Use any username/password to login (demo mode)

## Database Structure

The system uses the following tables:
- `users` - System users (admin, dean, alumni)
- `alumni` - Alumni records and employment data
- `departments` - Department reference data
- `curriculum_suggestions` - AI and manual curriculum recommendations
- `employment_history` - Career progression tracking
- `reports` - Generated reports tracking
- `activity_logs` - System activity logging

## User Roles

### Alumni
- View personal dashboard
- Limited read-only access

### Dean
- Department-specific alumni management
- Department analytics and reports
- Curriculum suggestions for their department

### Admin
- Full system access
- User management
- System-wide analytics and reports
- All curriculum suggestions

## File Structure

```
alumni-tracking-system/
├── index.html              # Main application file
├── assets/
│   ├── css/
│   │   └── style.css       # All styles and responsive design
│   ├── js/
│   │   └── app.js          # Application logic and functionality
│   └── images/
│       └── crmc-logo.png   # Institution logo
├── api/
│   ├── config/
│   │   └── database.php    # Database connection
│   ├── auth/
│   │   ├── login.php       # User authentication
│   │   └── register.php    # User registration
│   └── alumni/
│       └── index.php       # Alumni CRUD operations
└── README.md               # This file
```

## Features Overview

### Authentication System
- Secure login with role-based access
- User registration for admin and dean roles
- Session management

### Dashboard
- Role-specific navigation
- Overview statistics
- Recent activity tracking

### Alumni Management
- Add new alumni records
- Search and filter functionality
- Export capabilities
- Employment status tracking

### Analytics
- Department-specific metrics
- Employment rate tracking
- Salary analysis
- Career progression insights

### Curriculum Suggestions
- AI-powered recommendations
- Department-specific suggestions
- Impact metrics and implementation planning

### Reports
- Generate various report types
- Export functionality
- Historical report tracking

## Configuration

### Database Configuration
Edit `api/config/database.php` to match your database settings:

```php
private $host = 'localhost';
private $port = 3306;
private $db_name = 'alumni_tracking_system';
private $username = 'root';
private $password = ''; // XAMPP default
```

### Customization
- Update `assets/images/crmc-logo.png` with your institution's logo
- Modify colors and branding in `assets/css/style.css`
- Add departments in the JavaScript arrays in `assets/js/app.js`

## Security Notes

- This is a demo system with simplified authentication
- In production, implement proper password hashing
- Add input validation and sanitization
- Use HTTPS for secure communication
- Implement proper session management

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

This project is for educational purposes. Modify as needed for your institution.

## Support

For technical support or questions about the CRMC Alumni Tracking System, please contact your system administrator.