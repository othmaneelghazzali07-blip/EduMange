<div align="center">

# 🎓 EduManage

### Modern School Management System

A modern Full-Stack School Management Platform built with **React**, **Laravel REST API**, and **MySQL**, designed to simplify academic and administrative management through dedicated workspaces for administrators, teachers, and students.

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Laravel](https://img.shields.io/badge/Laravel-Backend-FF2D20?logo=laravel)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql)
![REST API](https://img.shields.io/badge/API-REST-success)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)
![RTK Query](https://img.shields.io/badge/RTK-Query-593D88)
![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-7952B3?logo=bootstrap)
![Laravel Sanctum](https://img.shields.io/badge/Auth-Sanctum-red)

</div>

---

## 📖 Overview

EduManage is a comprehensive school management platform developed to digitize and simplify educational administration.

The application centralizes daily academic operations through a secure role-based system, allowing administrators, teachers, and students to access dedicated dashboards tailored to their responsibilities.

Built using a modern **React + Laravel REST API** architecture, the project emphasizes scalability, maintainability, security, and user experience while following software engineering best practices. The authentication layer relies on Laravel Sanctum with Bearer Token authentication, and the frontend communicates with the backend through RTK Query. :contentReference[oaicite:0]{index=0}

---

📷 **🟢 حط هنا Screenshot ديال صفحة Login**

---

## 🎯 Objectives

The main objectives of EduManage are:

- Digitalize school administration.
- Simplify communication between school actors.
- Improve student academic monitoring.
- Centralize educational resources.
- Automate repetitive administrative tasks.
- Provide real-time statistics and dashboards.
- Ensure secure access through role-based authentication.
# ✨ Features

EduManage provides a complete digital ecosystem that simplifies the daily management of educational institutions by offering dedicated workspaces for each type of user.

---

# 👨‍💼 Administrator Features

The administrator has full control over the entire platform.

### Dashboard

- Global Statistics
- Total Students
- Total Teachers
- Total Classes
- Today's Schedule
- Active Classes Overview

📷 **🟢 حط هنا Screenshot ديال Dashboard Admin**

---

### Student Management

The administrator can:

- Add new students
- Update student information
- Delete student records
- Search students
- View student details
- Assign students to classes

📷 **🟢 حط هنا Screenshot ديال Gestion des Étudiants**

---

### Teacher Management

Features include:

- Add teachers
- Edit teacher information
- Delete teachers
- Assign teachers to classes
- Manage teaching subjects

📷 **🟢 حط هنا Screenshot ديال Gestion des Enseignants**

---

### Class Management

The administrator can:

- Create classes
- Update class information
- Assign students
- Assign teachers
- Manage classrooms

📷 **🟢 حط هنا Screenshot ديال Gestion des Classes**

---

### Subject Management

- Create subjects
- Edit subjects
- Delete subjects
- Assign teachers to subjects

📷 **🟢 حط هنا Screenshot ديال Gestion des Matières**

---

### Timetable Management

The scheduling module allows administrators to:

- Create weekly schedules
- Update schedules
- Delete sessions
- Filter schedules by date
- Organize classes efficiently

📷 **🟢 حط هنا Screenshot ديال Emploi du Temps**

---

# 👨‍🏫 Teacher Features

Teachers have their own dedicated workspace for managing academic activities.

---

### Teacher Dashboard

The dashboard provides quick access to:

- Assigned classes
- Today's schedule
- Academic overview

📷 **🟢 حط هنا Screenshot ديال Dashboard Enseignant**

---

### Grade Management

Teachers can:

- Select a class
- Select a subject
- Enter grades
- Update grades
- Calculate averages automatically

📷 **🟢 حط هنا Screenshot ديال Saisie des Notes**

---

### Attendance Management

The attendance system allows teachers to:

- Mark students as Present
- Mark students as Absent
- Mark students as Late
- View attendance statistics instantly

📷 **🟢 حط هنا Screenshot ديال Gestion des Absences**

---

### Weekly Schedule

Teachers can consult their personalized weekly timetable.

📷 **🟢 حط هنا Screenshot ديال Planning Enseignant**

---

# 👨‍🎓 Student Features

Students have read-only access to their academic information.

---

### Student Dashboard

Students can view:

- Attendance Summary
- Behavior Score
- Today's Schedule
- Academic Overview

📷 **🟢 حط هنا Screenshot ديال Dashboard Étudiant**

---

### Grades

Students can consult:

- Individual Subjects
- Continuous Assessments
- Average Grades
- Global Average

📷 **🟢 حط هنا Screenshot ديال Relevé de Notes**

---

### Timetable

Students can access their weekly class schedule.

📷 **🟢 حط هنا Screenshot ديال Emploi du Temps Étudiant**

---

# 🔐 Authentication & Security

EduManage implements secure authentication using Laravel Sanctum.

Security Features:

- Role-Based Access Control (RBAC)
- Protected API Routes
- Bearer Token Authentication
- Session Management
- Secure Login
- Protected Resources
- Unauthorized Access Prevention

---

# ⚡ API Communication

The frontend communicates with the backend using RESTful APIs.

Main characteristics:

- REST Architecture
- JSON Responses
- RTK Query Integration
- Axios HTTP Client
- Secure Bearer Token Authentication
- Optimized Data Fetching
- Automatic Cache Management
# 🛠 Technology Stack

EduManage is built using modern web technologies following a scalable client-server architecture.

---

## Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User Interface |
| React Router | Client-side Routing |
| Redux Toolkit | State Management |
| RTK Query | API Communication |
| Axios | HTTP Requests |
| Bootstrap | Responsive UI |
| JavaScript (ES6+) | Frontend Logic |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Laravel | REST API |
| Laravel Sanctum | Authentication |
| Eloquent ORM | Database Management |
| PHP | Backend Language |

---

## Database

| Technology | Purpose |
|------------|---------|
| MySQL | Relational Database |

---

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- Composer
- npm

---

# 🏗 System Architecture

EduManage follows a modern **Three-Tier Architecture**.

```text
+------------------------------------------------+
|                React Frontend                  |
|  Components • Redux • RTK Query • Bootstrap    |
+------------------------------------------------+
                    │
                    │ REST API
                    ▼
+------------------------------------------------+
|               Laravel Backend                  |
| Controllers • Services • Models • Sanctum      |
+------------------------------------------------+
                    │
                    │ Eloquent ORM
                    ▼
+------------------------------------------------+
|                 MySQL Database                 |
+------------------------------------------------+
```

📷 **🟢 حط هنا صورة Architecture Diagram**

---

# 📂 Project Structure

```text
EduManage
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── backend
│   ├── app
│   ├── routes
│   ├── database
│   ├── storage
│   ├── config
│   └── ...
│
└── README.md
```

---

# ⚙ Installation

## Clone the repository

```bash
git clone https://github.com/othmaneelghazzali07-blip/EduMange.git
```

---

## Backend Setup

```bash
cd backend

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate

php artisan serve
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔧 Environment Variables

Configure your backend `.env` file.

```env
APP_NAME=EduManage

APP_ENV=local

APP_KEY=

APP_DEBUG=true

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=edumanage

DB_USERNAME=root

DB_PASSWORD=
```

---

# 🚀 Running the Application

Start Laravel

```bash
php artisan serve
```

Start React

```bash
npm run dev
```

The application will now be available locally.

---

# 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@epg.ma | password |
| Teacher | hasan.wardi@epg.ma | password |
| Student | yassine.prof@epg.ma | password |

---

📷 **🟢 حط هنا Screenshot ديال صفحة Login باستعمال هاد الحسابات**

# 🌐 REST API Overview

EduManage follows a RESTful API architecture where the React frontend communicates with the Laravel backend using secure HTTP requests.

Authentication is handled using **Laravel Sanctum** with **Bearer Token Authentication**, while RTK Query manages API requests, caching, and synchronization between the frontend and backend. :contentReference[oaicite:0]{index=0}

---

## Main API Modules

### Authentication

- Login
- Logout
- Current User
- Profile

---

### Administrator APIs

- Dashboard Statistics
- Students Management
- Teachers Management
- Classes Management
- Subjects Management
- Schedule Management

---

### Teacher APIs

- Assigned Classes
- Grades Management
- Attendance Management
- Weekly Schedule

---

### Student APIs

- Dashboard
- Grades
- Attendance
- Weekly Schedule

---

📷 **🟢 حط هنا Screenshot ديال Postman ولا Swagger إذا عندك**

---

# 🗄 Database Design

The application relies on a relational MySQL database.

Main entities include:

- Users
- Students
- Teachers
- Classes
- Subjects
- Sessions
- Attendance
- Grades
- Academic Years

Relationships are managed through Laravel Eloquent ORM to ensure data integrity and simplify database interactions.

---

📷 **🟢 حط هنا ER Diagram**

---

# 📊 UML Diagrams

The project was designed following Software Engineering best practices.

Available diagrams include:

- Use Case Diagram
- Class Diagram
- Sequence Diagram
- Activity Diagram

These diagrams were used during the analysis and design phases before implementation.

---

📷 **🟢 حط هنا Use Case Diagram**

📷 **🟢 حط هنا Class Diagram**

📷 **🟢 حط هنا Sequence Diagram**

📷 **🟢 حط هنا Activity Diagram**

---

# 🧪 Testing

Several validation tests were performed to ensure system reliability and correctness.

### Authentication

- Secure Login
- Sanctum Authentication
- Bearer Token Validation

### Administrator

- Student CRUD
- Teacher CRUD
- Class Management
- Schedule Generation

### Teacher

- Grade Entry
- Attendance Recording
- Weekly Planning

### Student

- Grades Consultation
- Attendance Consultation
- Weekly Timetable

### API

- JSON Responses
- HTTP Status Codes
- Protected Routes

All functional tests were successfully validated according to the project validation phase. :contentReference[oaicite:1]{index=1}

---

📷 **🟢 حط هنا Screenshot ديال Tableau de Validation**

---

# 📸 Application Gallery

## Login

📷 **🟢 Login Page**

---

## Administrator Dashboard

📷 **🟢 Dashboard Admin**

---

## Student Management

📷 **🟢 Gestion des Étudiants**

---

## Teacher Management

📷 **🟢 Gestion des Enseignants**

---

## Class Management

📷 **🟢 Gestion des Classes**

---

## Timetable

📷 **🟢 Emploi du Temps**

---

## Teacher Dashboard

📷 **🟢 Dashboard Enseignant**

---

## Grade Management

📷 **🟢 Gestion des Notes**

---

## Attendance

📷 **🟢 Gestion des Absences**

---

## Student Dashboard

📷 **🟢 Dashboard Étudiant**

---

## Student Grades

📷 **🟢 Relevé de Notes**

---

## Student Timetable

📷 **🟢 Emploi du Temps Étudiant**

---

# 🚀 Future Improvements

Possible future enhancements include:

- Docker Deployment
- CI/CD Pipeline
- AWS Deployment
- Email Notifications
- Mobile Application
- PDF Report Generation
- Parent Portal
- Online Payments
- Multi-language Support
- Advanced Analytics Dashboard

---

# 👨‍💻 Author

**Othmane EL GHAZZALI**

Full Stack Developer | DevOps Enthusiast

- GitHub: https://github.com/othmaneelghazzali07-blip
- LinkedIn: *(Add your LinkedIn profile here)*

---

# 🙏 Acknowledgments

This project was developed as part of the requirements for obtaining the **Specialized Technician Diploma in Digital Development – Full Stack Web** at **OFPPT – ISTA Hay Al Adarissa, Fès**.

Special thanks to my supervisor for the guidance and support provided throughout the project.

---

# 📄 License

This project is released for educational and portfolio purposes.

You are welcome to explore the source code, learn from the implementation, and use it as inspiration for your own educational projects.
