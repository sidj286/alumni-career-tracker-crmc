// Application State
let currentUser = null;
let currentPage = 'overview';
let sidebarOpen = false;
let notifications = [];
let unreadCount = 0;

// Navigation Menu Items
const menuItems = {
    alumni: [
        { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' }
    ],
    dean: [
        { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
        { id: 'alumni', label: 'Alumni Management', icon: 'fas fa-users' },
        { id: 'analytics', label: 'Department Analytics', icon: 'fas fa-chart-bar' },
        { id: 'curriculum', label: 'Curriculum Suggestions', icon: 'fas fa-lightbulb' },
        { id: 'reports', label: 'Reports', icon: 'fas fa-file-alt' }
    ],
    admin: [
        { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
        { id: 'alumni', label: 'Alumni Management', icon: 'fas fa-users' },
        { id: 'analytics', label: 'Department Analytics', icon: 'fas fa-chart-bar' },
        { id: 'curriculum', label: 'Curriculum Suggestions', icon: 'fas fa-lightbulb' },
        { id: 'users', label: 'User Management', icon: 'fas fa-cog' },
        { id: 'reports', label: 'Reports', icon: 'fas fa-file-alt' }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeNotifications();
});

function initializeApp() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showPage('loginPage');
    }
}

function setupEventListeners() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Navigation between login and register
    const showRegisterBtn = document.getElementById('showRegister');
    const backToLoginBtn = document.getElementById('backToLogin');
    
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', () => showPage('registerPage'));
    }
    
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', () => showPage('loginPage'));
    }
    
    // Password toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', togglePasswordVisibility);
    });
    
    // Role change in registration
    const registerRole = document.getElementById('registerRole');
    if (registerRole) {
        registerRole.addEventListener('change', handleRoleChange);
    }
    
    // Dashboard controls
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', toggleSidebar);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Notification handlers
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', toggleNotifications);
    }
    
    // Close notifications when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-container')) {
            closeNotifications();
        }
    });
}

// Authentication Functions
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const loginData = {
        username: formData.get('username'),
        password: formData.get('password'),
        role: formData.get('role')
    };
    
    showLoading(true);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, accept any credentials
        currentUser = {
            id: 1,
            username: loginData.username,
            role: loginData.role,
            department: loginData.role === 'dean' ? 'Computer Science' : null
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showDashboard();
        
    } catch (error) {
        alert('Login failed: ' + error.message);
    } finally {
        showLoading(false);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const registerData = {
        fullName: formData.get('fullName'),
        username: formData.get('username'),
        email: formData.get('email'),
        role: formData.get('role'),
        department: formData.get('department'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };
    
    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Validate department for dean/alumni
    if ((registerData.role === 'dean' || registerData.role === 'alumni') && !registerData.department) {
        alert('Department is required for ' + registerData.role + ' role');
        return;
    }
    
    showLoading(true);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        alert('Registration successful! You can now login with your credentials.');
        showPage('loginPage');
        
    } catch (error) {
        alert('Registration failed: ' + error.message);
    } finally {
        showLoading(false);
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showPage('loginPage');
}

// UI Functions
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function showDashboard() {
    showPage('dashboard');
    updateUserInfo();
    buildNavigation();
    loadNotifications();
    loadPage('overview');
}

function updateUserInfo() {
    if (!currentUser) return;
    
    const userNameEl = document.getElementById('headerUserName');
    const userRoleEl = document.getElementById('headerUserRole');
    const userAvatarEl = document.getElementById('headerUserAvatar');
    
    if (userNameEl) userNameEl.textContent = currentUser.username;
    if (userRoleEl) userRoleEl.textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    if (userAvatarEl) userAvatarEl.textContent = currentUser.username.charAt(0).toUpperCase();
    
    // Update notification badge
    updateNotificationBadge();
}

function buildNavigation() {
    if (!currentUser) return;
    
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;
    
    const items = menuItems[currentUser.role] || [];
    
    navMenu.innerHTML = items.map(item => `
        <li class="nav-item">
            <a href="#" class="nav-link" data-page="${item.id}">
                <i class="${item.icon}"></i>
                <span>${item.label}</span>
            </a>
        </li>
    `).join('');
    
    // Add click listeners to navigation links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            loadPage(pageId);
        });
    });
}

function loadPage(pageId) {
    currentPage = pageId;
    
    // Update active navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Load page content
    const pageContent = document.getElementById('pageContent');
    if (pageContent) {
        pageContent.innerHTML = getPageContent(pageId);
        
        // Initialize page-specific functionality
        initializePage(pageId);
    }
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
}

function getPageContent(pageId) {
    switch (pageId) {
        case 'overview':
            return getOverviewContent();
        case 'alumni':
            return getAlumniManagementContent();
        case 'analytics':
            return getAnalyticsContent();
        case 'curriculum':
            return getCurriculumContent();
        case 'users':
            return getUserManagementContent();
        case 'reports':
            return getReportsContent();
        default:
            return '<div class="card"><h2>Page not found</h2></div>';
    }
}

// Page Content Functions
function getOverviewContent() {
    return `
        <div class="card">
            <div class="card-header">
                <h1 class="card-title">Welcome back, ${currentUser.username}!</h1>
            </div>
            <p>Here's what's happening with CRMC alumni tracking today.</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon blue">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                    <h3>2,847</h3>
                    <p>Total Alumni</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon green">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div class="stat-content">
                    <h3>68.3%</h3>
                    <p>Employed In-Field</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon purple">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="stat-content">
                    <h3>482</h3>
                    <p>Recent Graduates</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon orange">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="stat-content">
                    <h3>23.7%</h3>
                    <p>Career Growth Rate</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Recent Activity</h2>
            </div>
            <div class="activity-list">
                <div class="activity-item">
                    <i class="fas fa-upload"></i>
                    <div>
                        <strong>New alumni data uploaded</strong>
                        <p>45 records added to Computer Science department</p>
                        <small>2 hours ago</small>
                    </div>
                </div>
                <div class="activity-item">
                    <i class="fas fa-lightbulb"></i>
                    <div>
                        <strong>Curriculum suggestion generated</strong>
                        <p>AI recommends adding Data Science elective</p>
                        <small>4 hours ago</small>
                    </div>
                </div>
                <div class="activity-item">
                    <i class="fas fa-download"></i>
                    <div>
                        <strong>Department report exported</strong>
                        <p>Business Administration Q4 2024 analytics</p>
                        <small>6 hours ago</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getAlumniManagementContent() {
    return `
        <div class="card">
            <div class="card-header">
                <h1 class="card-title">Alumni Management</h1>
                <button class="btn btn-primary" onclick="showAddAlumniModal()">
                    <i class="fas fa-plus"></i>
                    Add Alumni
                </button>
            </div>
            
            <div class="form-grid mb-4">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search alumni..." id="alumniSearch">
                </div>
                <select id="departmentFilter">
                    <option value="">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Hospitality Management">Hospitality Management</option>
                </select>
                <select id="yearFilter">
                    <option value="">All Years</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
                <button class="btn btn-outline">
                    <i class="fas fa-download"></i>
                    Export
                </button>
            </div>
            
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Alumni Info</th>
                            <th>Department</th>
                            <th>Graduation</th>
                            <th>Current Position</th>
                            <th>Employment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="alumniTableBody">
                        <!-- Alumni data will be loaded here -->
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getAnalyticsContent() {
    const departmentText = currentUser.role === 'dean' && currentUser.department 
        ? ` - ${currentUser.department}` 
        : '';
        
    return `
        <div class="card">
            <div class="card-header">
                <h1 class="card-title">Department Analytics${departmentText}</h1>
                ${currentUser.role === 'admin' ? `
                <select id="analyticsFilter">
                    <option value="">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Hospitality Management">Hospitality Management</option>
                </select>
                ` : ''}
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon blue">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <h3>324</h3>
                        <p>Total Alumni</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon green">
                        <i class="fas fa-target"></i>
                    </div>
                    <div class="stat-content">
                        <h3>85.2%</h3>
                        <p>In-Field Employment</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon purple">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <div class="stat-content">
                        <h3>92.1%</h3>
                        <p>Employment Rate</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon orange">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="stat-content">
                        <h3>$75,000</h3>
                        <p>Avg. Starting Salary</p>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h2 class="card-title">Top Job Titles</h2>
                <div class="job-titles-list">
                    <div class="job-item">
                        <span class="job-title">Software Engineer</span>
                        <span class="job-count">89 alumni (27.5%)</span>
                    </div>
                    <div class="job-item">
                        <span class="job-title">Data Analyst</span>
                        <span class="job-count">45 alumni (13.9%)</span>
                    </div>
                    <div class="job-item">
                        <span class="job-title">System Administrator</span>
                        <span class="job-count">34 alumni (10.5%)</span>
                    </div>
                    <div class="job-item">
                        <span class="job-title">Web Developer</span>
                        <span class="job-count">28 alumni (8.6%)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCurriculumContent() {
    const departmentFilter = currentUser.role === 'dean' && currentUser.department
        ? `<p class="mb-4">Showing suggestions for ${currentUser.department} department</p>`
        : '';
        
    return `
        <div class="card">
            <div class="card-header">
                <h1 class="card-title">Curriculum Suggestions</h1>
                <div class="flex gap-2">
                    <button class="btn btn-secondary">
                        <i class="fas fa-brain"></i>
                        Run AI Analysis
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        Add Suggestion
                    </button>
                </div>
            </div>
            
            ${departmentFilter}
            
            <div class="suggestions-list">
                <div class="suggestion-card">
                    <div class="suggestion-header">
                        <div class="suggestion-icon ai">
                            <i class="fas fa-brain"></i>
                        </div>
                        <div class="suggestion-info">
                            <h3>Add Data Science Specialization Track</h3>
                            <div class="suggestion-meta">
                                <span class="badge high">High Priority</span>
                                <span class="badge pending">Pending</span>
                                <span>Computer Science</span>
                                <span>AI Generated</span>
                            </div>
                        </div>
                    </div>
                    <p>Based on alumni career trends, 34% of CS graduates are working in data-related roles. Adding a specialized track would better prepare students.</p>
                    
                    <div class="impact-metrics">
                        <div class="metric">
                            <strong>+15%</strong>
                            <span>Expected In-Field Rate Increase</span>
                        </div>
                        <div class="metric">
                            <strong>120</strong>
                            <span>Students Affected Annually</span>
                        </div>
                        <div class="metric">
                            <strong>6 months</strong>
                            <span>Implementation Time</span>
                        </div>
                    </div>
                    
                    ${currentUser.role === 'admin' ? `
                    <div class="suggestion-actions">
                        <button class="btn btn-sm btn-primary">Approve</button>
                        <button class="btn btn-sm btn-secondary">Reject</button>
                    </div>
                    ` : ''}
                </div>
                
                <div class="suggestion-card">
                    <div class="suggestion-header">
                        <div class="suggestion-icon ai">
                            <i class="fas fa-brain"></i>
                        </div>
                        <div class="suggestion-info">
                            <h3>Strengthen Cybersecurity Curriculum</h3>
                            <div class="suggestion-meta">
                                <span class="badge high">High Priority</span>
                                <span class="badge approved">Approved</span>
                                <span>Computer Science</span>
                                <span>AI Generated</span>
                            </div>
                        </div>
                    </div>
                    <p>Alumni survey indicates 28% moved into cybersecurity roles within 2 years of graduation, but many lacked foundational security knowledge.</p>
                    
                    <div class="impact-metrics">
                        <div class="metric">
                            <strong>+22%</strong>
                            <span>Expected In-Field Rate Increase</span>
                        </div>
                        <div class="metric">
                            <strong>95</strong>
                            <span>Students Affected Annually</span>
                        </div>
                        <div class="metric">
                            <strong>4 months</strong>
                            <span>Implementation Time</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getUserManagementContent() {
    return `
        <div class="card">
            <div class="card-header">
                <h1 class="card-title">User Management</h1>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Add User
                </button>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon blue">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <h3>15</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon orange">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="stat-content">
                        <h3>3</h3>
                        <p>Administrators</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon purple">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <div class="stat-content">
                        <h3>8</h3>
                        <p>Deans</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon green">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="stat-content">
                        <h3>4</h3>
                        <p>Alumni</p>
                    </div>
                </div>
            </div>
            
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <div class="user-avatar">JS</div>
                                    <div>
                                        <strong>Dr. John Smith</strong>
                                        <br><small>j.smith@crmc.edu</small>
                                    </div>
                                </div>
                            </td>
                            <td><span class="badge admin">Admin</span></td>
                            <td>Administration</td>
                            <td><span class="badge active">Active</span></td>
                            <td>2024-01-20</td>
                            <td>
                                <button class="btn btn-sm btn-outline">Edit</button>
                                <button class="btn btn-sm btn-secondary">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function getReportsContent() {
    return `
        <div class="card">
            <div class="card-header">
                <h1 class="card-title">Reports</h1>
            </div>
            
            <div class="report-generator">
                <h2>Generate New Report</h2>
                <div class="form-grid">
                    <select>
                        <option>Institutional Overview</option>
                        <option>Department Performance</option>
                        <option>Employment Trends</option>
                        <option>Curriculum Impact</option>
                    </select>
                    <select>
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                        <option>Last 2 Years</option>
                        <option>All Time</option>
                    </select>
                    ${currentUser.role === 'admin' ? `
                    <select>
                        <option>All Departments</option>
                        <option>Computer Science</option>
                        <option>Business Administration</option>
                        <option>Engineering</option>
                        <option>Psychology</option>
                        <option>Hospitality Management</option>
                    </select>
                    ` : ''}
                    <button class="btn btn-primary">
                        <i class="fas fa-download"></i>
                        Generate Report
                    </button>
                </div>
            </div>
            
            <div class="recent-reports">
                <h2>Recent Reports</h2>
                <div class="reports-list">
                    <div class="report-item">
                        <div class="report-info">
                            <h3>Q4 2024 Alumni Employment Report</h3>
                            <p>Institutional Overview • All Departments</p>
                            <small>Generated on 2024-01-15 by Dr. John Smith</small>
                        </div>
                        <div class="report-actions">
                            <button class="btn btn-sm btn-outline">View</button>
                            <button class="btn btn-sm btn-primary">Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Utility Functions
function togglePasswordVisibility(e) {
    const input = e.target.closest('.input-group').querySelector('input');
    const icon = e.target.closest('button').querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function handleRoleChange(e) {
    const role = e.target.value;
    const departmentGroup = document.getElementById('departmentGroup');
    const departmentSelect = document.getElementById('registerDepartment');
    
    if (role === 'dean' || role === 'alumni') {
        departmentGroup.style.display = 'block';
        departmentSelect.required = true;
    } else {
        departmentGroup.style.display = 'none';
        departmentSelect.required = false;
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.add('open');
        mainContent.classList.add('sidebar-open');
    } else {
        sidebar.classList.remove('open');
        mainContent.classList.remove('sidebar-open');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebarOpen = false;
    sidebar.classList.remove('open');
    mainContent.classList.remove('sidebar-open');
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
}

function initializePage(pageId) {
    // Initialize page-specific functionality
    switch (pageId) {
        case 'alumni':
            loadAlumniData();
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        // Add other page initializations as needed
    }
}

function loadAlumniData() {
    // Sample alumni data
    const alumniData = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            department: 'Computer Science',
            graduation_year: 2022,
            current_position: 'Software Engineer',
            company: 'TechCorp Inc',
            is_in_field: true
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            department: 'Business Administration',
            graduation_year: 2021,
            current_position: 'Marketing Manager',
            company: 'Marketing Solutions LLC',
            is_in_field: true
        }
    ];
    
    const tbody = document.getElementById('alumniTableBody');
    if (tbody) {
        tbody.innerHTML = alumniData.map(alumni => `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="user-avatar">${alumni.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                            <strong>${alumni.name}</strong>
                            <br><small>${alumni.email}</small>
                        </div>
                    </div>
                </td>
                <td>${alumni.department}</td>
                <td>${alumni.graduation_year}</td>
                <td>
                    <strong>${alumni.current_position || 'Not specified'}</strong>
                    <br><small>${alumni.company || ''}</small>
                </td>
                <td>
                    <span class="badge ${alumni.is_in_field ? 'active' : 'pending'}">
                        ${alumni.is_in_field ? 'In-Field' : 'Out-of-Field'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline">View</button>
                    <button class="btn btn-sm btn-primary">Edit</button>
                </td>
            </tr>
        `).join('');
    }
}

function loadAnalyticsData() {
    // Analytics data would be loaded here
    console.log('Loading analytics data...');
}

// Notification System
function initializeNotifications() {
    // Initialize notification system
    notifications = [];
    unreadCount = 0;
}

function loadNotifications() {
    if (!currentUser) return;
    
    // Generate role-specific notifications
    notifications = generateNotificationsForRole(currentUser.role);
    unreadCount = notifications.filter(n => !n.read).length;
    updateNotificationBadge();
    renderNotifications();
}

function generateNotificationsForRole(role) {
    const baseNotifications = [];
    const now = new Date();
    
    switch (role) {
        case 'alumni':
            return [
                {
                    id: 1,
                    title: 'Profile Update Request',
                    message: 'Please update your current employment status',
                    type: 'info',
                    read: false,
                    timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                    icon: 'fas fa-user-edit'
                },
                {
                    id: 2,
                    title: 'Career Survey Available',
                    message: 'Help us improve our programs by completing the career outcome survey',
                    type: 'success',
                    read: false,
                    timestamp: new Date(now - 5 * 24 * 60 * 60 * 1000), // 5 days ago
                    icon: 'fas fa-clipboard-list'
                },
                {
                    id: 3,
                    title: 'System Maintenance',
                    message: 'Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM',
                    type: 'warning',
                    read: true,
                    timestamp: new Date(now - 7 * 24 * 60 * 60 * 1000), // 1 week ago
                    icon: 'fas fa-tools'
                }
            ];
            
        case 'dean':
            return [
                {
                    id: 1,
                    title: 'New Alumni Added',
                    message: '3 new Computer Science alumni added to the system',
                    type: 'success',
                    read: false,
                    timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                    icon: 'fas fa-user-plus'
                },
                {
                    id: 2,
                    title: 'AI Curriculum Suggestion',
                    message: 'New suggestion: Add Data Science Specialization Track',
                    type: 'info',
                    read: false,
                    timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                    icon: 'fas fa-lightbulb'
                },
                {
                    id: 3,
                    title: 'Department Analytics Ready',
                    message: 'Monthly Computer Science department report is available',
                    type: 'info',
                    read: false,
                    timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                    icon: 'fas fa-chart-bar'
                },
                {
                    id: 4,
                    title: 'Alumni Employment Update',
                    message: 'John Doe updated employment status to Senior Developer',
                    type: 'success',
                    read: true,
                    timestamp: new Date(now - 4 * 24 * 60 * 60 * 1000), // 4 days ago
                    icon: 'fas fa-briefcase'
                }
            ];
            
        case 'admin':
            return [
                {
                    id: 1,
                    title: 'New User Registration',
                    message: 'Dr. Sarah Johnson registered as Dean of Psychology',
                    type: 'info',
                    read: false,
                    timestamp: new Date(now - 30 * 60 * 1000), // 30 minutes ago
                    icon: 'fas fa-user-plus'
                },
                {
                    id: 2,
                    title: 'System Performance Alert',
                    message: 'Database query response time increased by 15%',
                    type: 'warning',
                    read: false,
                    timestamp: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
                    icon: 'fas fa-exclamation-triangle'
                },
                {
                    id: 3,
                    title: 'Bulk Data Import Completed',
                    message: '150 alumni records imported successfully',
                    type: 'success',
                    read: false,
                    timestamp: new Date(now - 6 * 60 * 60 * 1000), // 6 hours ago
                    icon: 'fas fa-upload'
                },
                {
                    id: 4,
                    title: 'Cross-Department Analytics',
                    message: 'Q4 2024 institutional report generated',
                    type: 'info',
                    read: true,
                    timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                    icon: 'fas fa-chart-line'
                },
                {
                    id: 5,
                    title: 'Security Update',
                    message: 'Failed login attempts detected from IP 192.168.1.100',
                    type: 'error',
                    read: true,
                    timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                    icon: 'fas fa-shield-alt'
                }
            ];
            
        default:
            return [];
    }
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    if (dropdown.style.display === 'block') {
        closeNotifications();
    } else {
        openNotifications();
    }
}

function openNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.style.display = 'block';
    renderNotifications();
}

function closeNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.style.display = 'none';
}

function renderNotifications() {
    const container = document.getElementById('notificationList');
    if (!container) return;
    
    if (notifications.length === 0) {
        container.innerHTML = `
            <div class="notification-item empty">
                <i class="fas fa-bell-slash"></i>
                <p>No notifications</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
            <div class="notification-icon ${notification.type}">
                <i class="${notification.icon}"></i>
            </div>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <small>${formatNotificationTime(notification.timestamp)}</small>
            </div>
            ${!notification.read ? '<div class="notification-dot"></div>' : ''}
        </div>
    `).join('');
    
    // Add click handlers to mark as read
    container.querySelectorAll('.notification-item.unread').forEach(item => {
        item.addEventListener('click', () => markAsRead(parseInt(item.dataset.id)));
    });
}

function markAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
        notification.read = true;
        unreadCount = Math.max(0, unreadCount - 1);
        updateNotificationBadge();
        renderNotifications();
    }
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

function formatNotificationTime(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
}

function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    unreadCount = 0;
    updateNotificationBadge();
    renderNotifications();
}

// Add additional CSS for new components
const additionalCSS = `
.activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.activity-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
}

.activity-item i {
    color: #3b82f6;
    margin-top: 0.25rem;
}

.activity-item strong {
    display: block;
    margin-bottom: 0.25rem;
}

.activity-item p {
    margin: 0;
    color: #6b7280;
}

.activity-item small {
    color: #9ca3af;
}

.job-titles-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.job-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
}

.job-title {
    font-weight: 600;
}

.job-count {
    color: #6b7280;
    font-size: 0.875rem;
}

.suggestions-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.suggestion-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.5rem;
}

.suggestion-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
}

.suggestion-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
}

.suggestion-icon.ai {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.suggestion-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 600;
}

.suggestion-meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    font-size: 0.75rem;
}

.badge {
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-weight: 500;
    font-size: 0.75rem;
}

.badge.high { background: #fef2f2; color: #dc2626; }
.badge.medium { background: #fef3c7; color: #d97706; }
.badge.low { background: #f0fdf4; color: #16a34a; }
.badge.pending { background: #fef3c7; color: #d97706; }
.badge.approved { background: #f0fdf4; color: #16a34a; }
.badge.active { background: #f0fdf4; color: #16a34a; }
.badge.admin { background: #fef2f2; color: #dc2626; }

.impact-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.metric {
    text-align: center;
    padding: 1rem;
    background: white;
    border-radius: 8px;
}

.metric strong {
    display: block;
    font-size: 1.25rem;
    color: #1f2937;
    margin-bottom: 0.25rem;
}

.metric span {
    font-size: 0.75rem;
    color: #6b7280;
}

.suggestion-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
}

.report-generator {
    background: #f9fafb;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
}

.report-generator h2 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 600;
}

.reports-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.report-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: #f9fafb;
    border-radius: 12px;
}

.report-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.125rem;
    font-weight: 600;
}

.report-info p {
    margin: 0 0 0.25rem 0;
    color: #6b7280;
}

.report-info small {
    color: #9ca3af;
}

.report-actions {
    display: flex;
    gap: 0.5rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-info .user-avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.75rem;
}

/* Notification System Styles */
.notification-container {
    position: relative;
}

.notification-btn {
    position: relative;
    background: none;
    border: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.2s;
}

.notification-btn:hover {
    background: #f3f4f6;
    color: #374151;
}

.notification-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    background: #dc2626;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    font-weight: 600;
    display: none;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.notification-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 350px;
    max-height: 400px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    display: none;
    z-index: 1000;
    overflow: hidden;
}

.notification-header {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9fafb;
}

.notification-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
}

.mark-all-read {
    background: none;
    border: none;
    color: #dc2626;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
}

.mark-all-read:hover {
    background: #fef2f2;
}

.notification-list {
    max-height: 300px;
    overflow-y: auto;
}

.notification-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
}

.notification-item:hover {
    background: #f9fafb;
}

.notification-item.unread {
    background: #fef7f0;
    border-left: 3px solid #dc2626;
}

.notification-item.empty {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    color: #9ca3af;
    cursor: default;
}

.notification-item.empty:hover {
    background: transparent;
}

.notification-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.875rem;
    flex-shrink: 0;
}

.notification-icon.info {
    background: #3b82f6;
}

.notification-icon.success {
    background: #10b981;
}

.notification-icon.warning {
    background: #f59e0b;
}

.notification-icon.error {
    background: #ef4444;
}

.notification-content {
    flex: 1;
    min-width: 0;
}

.notification-content h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.3;
}

.notification-content p {
    margin: 0 0 0.25rem 0;
    font-size: 0.75rem;
    color: #6b7280;
    line-height: 1.4;
}

.notification-content small {
    font-size: 0.625rem;
    color: #9ca3af;
}

.notification-dot {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 8px;
    height: 8px;
    background: #dc2626;
    border-radius: 50%;
}

@media (max-width: 768px) {
    .notification-dropdown {
        width: 300px;
        right: -50px;
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);