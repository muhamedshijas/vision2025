# Vision2025 Project

Vision2025 is a comprehensive goal-setting and habit-tracking application built with React (frontend) and NestJS (backend). The app is designed to help users manage their daily, monthly, and annual tasks, track habits, and keep personal information securely stored.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)

## Project Overview

Vision2025 is built to allow users to track tasks, habits, and goals over different time periods (daily, monthly, and annual). It includes various sections where users can log and reflect on their activities, update personal details, store important dates, and even manage passwords securely. The app is divided into multiple sections such as:

- **Daily Tasks**: Track daily tasks, including spiritual (religious), professional, and personal habits (e.g., daily routine, feedback, and reports).
- **Profile Section**: Manage personal information, including name, address, and occupation. Securely store passwords, track important dates, and manage job history with templates for job application letters.
- **Vision Board**: A space to set and update personal and professional goals for the future.

## Key Features

### 📅 Task & Habit Tracking
- **Daily, Monthly, and Annual Sections**: Organize your life by logging tasks across different timeframes.
  - **Subsections**:
    - 🔹 **Religious**: Track spiritual activities.
    - 🔹 **Professional**: Monitor career-related progress.
    - 🔹 **Daily Routine**: Record habits like sleeping time, exercise, and productivity.
    - 🔹 **Daily Feedback**: Reflect on your day and areas for improvement.
    - 🔹 **Daily Report**: Summarized analysis of your progress.

### 📝 Profile & Personal Management
- **Personal Section**: Store essential details like name, address, and occupation.
- **Password Vault**: Securely store passwords (encrypted in the database).
- **Important Dates**: Keep track of key dates like anniversaries, meetings, or deadlines.
- **Job Section**: Maintain records of previous employers, work experience, and download useful templates like job application letters.
- **Vision Board**: Set and update personal and professional goals for the future.

### 📊 Reports & Insights
- Generate daily, monthly, and annual reports based on logged tasks and reflections.
- Visualize patterns in habits and track progress over time.

## Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: NestJS, TypeScript, MongoDB (with Mongoose)
- **Authentication**: JWT, Passport.js
- **Encryption**: bcrypt for password storage
- **Other**: Axios for HTTP requests, React Router for navigation

