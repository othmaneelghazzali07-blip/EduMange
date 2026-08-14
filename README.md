# 🎓 EduMange — Gestion de la Vie Scolaire

![EduMange Logo](screenshots/logo.jpeg)

**EduMange** is a full-stack web application designed to centralize and simplify the management of school life.

The platform provides dedicated interfaces for **Administrators, Teachers, and Students**, allowing each role to manage and access the information relevant to them.

This project was developed as a **Projet de Fin d'Études (PFE)** as part of the **Technicien Spécialisé en Développement Digital – Option Web Full Stack** program.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [User Roles](#-user-roles)
- [Technologies](#-technologies)
- [Project Architecture](#-project-architecture)
- [Application Screenshots](#-application-screenshots)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Running the Project](#-running-the-project)
- [API](#-api)
- [Security](#-security)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🚀 Overview

EduMange is a school management platform developed to facilitate the management of academic and administrative activities.

The application brings together the main actors of a school environment in a single platform:

- 👨‍💼 Administrators
- 👨‍🏫 Teachers
- 🎓 Students

The system allows administrators to manage users, classes, subjects and schedules, while teachers can manage grades and attendance and students can consult their academic information.

---

## ✨ Features

### 🔐 Authentication & Authorization

- Secure user authentication
- Role-based access control
- Protected routes
- Dedicated interfaces according to user role

### 👨‍💼 Administrator

Administrators can manage the main resources of the school:

- 📚 Classes
- 👨‍🏫 Teachers
- 🎓 Students
- 📖 Subjects
- 🗓️ Sessions
- 🏫 Rooms
- 📝 Grades
- 📊 Attendance
- 🔔 Notifications

### 👨‍🏫 Teacher

Teachers can:

- View their dashboard
- Consult their timetable
- Manage grades
- Manage student attendance
- Access classes and subjects assigned to them

### 🎓 Student

Students can:

- Access their personal dashboard
- View their timetable
- Consult their grades
- View their absences
- Access their academic information

---

# 👥 User Roles

| Role | Main Responsibilities |
|------|------------------------|
| 👨‍💼 Admin | Manage users, classes, subjects, rooms, schedules, grades and attendance |
| 👨‍🏫 Teacher | Manage grades, attendance and teaching schedule |
| 🎓 Student | Consult grades, attendance and timetable |

---

# 🛠️ Technologies

## Frontend

- ⚛️ React.js
- ⚡ Vite
- 🎨 CSS
- 📦 Bootstrap
- 🔄 Redux Toolkit
- 🔌 RTK Query
- 🌐 Axios

## Backend

- 🐘 Laravel
- 🐘 PHP
- 🔗 REST API
- 🔐 Laravel Sanctum
- 🗄️ Eloquent ORM

## Database

- 🐬 MySQL
- Database migrations
- Seeders
- Relational data modeling

## Development Tools

- Git
- GitHub
- Postman
- Visual Studio Code
- npm
- Composer

---

# 🏗️ Project Architecture

EduMange follows a **separated frontend/backend architecture**.

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │       Laravel        │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                               │ Eloquent ORM
                               ▼
                    ┌──────────────────────┐
                    │        MySQL         │
                    │       Database       │
                    └──────────────────────┘
