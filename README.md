# 🚀 Angular Training - ITI

This repository contains my hands-on Angular training projects during the ITI program.
Each branch represents a specific training day with incremental features and improvements.

---

## 📌 Project Overview

This project started as a simple Angular application and evolved step by step into a **Courses Management System**.

Throughout the training, I applied core Angular concepts including:

* Components & Data Binding
* Directives & Pipes
* Services & Dependency Injection
* Routing & Navigation
* HTTP & API Integration
* Forms & Validation

---

## 🗂 Branch Structure

| Branch  | Description                    |
| ------- | ------------------------------ |
| `day-1` | Angular basics & project setup |
| `day-2` | Components, binding & UI logic |
| `day-3` | Directives & Pipes             |
| `day-4` | Services & Routing             |
| `day-5` | API integration & Forms        |

---

## 🧩 Features by Day

---

### ✅ Day 1 - Angular Basics & Setup

* Created Angular project using Angular CLI
* Project structure understanding:

  * `app.component`
  * `main.ts`
  * `index.html`
* Basic component creation
* Introduction to:

  * Interpolation `{{ }}`
  * Property binding `[ ]`
  * Event binding `( )`
* Display static data in UI

---

### ✅ Day 2 - Components & Data Binding

* Created reusable components
* Implemented:

  * Two-way data binding using `ngModel`
* Built dynamic UI:

  * Products list rendering
* Added:

  * Image binding
  * Dynamic price display
* Implemented:

  * Event handling (Buy button)
* Calculated:

  * Total order price dynamically
* Used:

  * Structural directives:

    * `*ngFor`
    * `*ngIf`
* Added:

  * Category filtering logic

---

### ✅ Day 3 - Directives & Pipes

* Custom Pipe:

  * `shorten` → shorten long text
  * `discount` → apply percentage discount (default 10%)
* Custom Directives:

  * `highlight` → change background on hover
  * `appDisableAfterClick`:

    * disables button
    * changes text to "Processing..."
    * re-enables after 3 seconds
* Used:

  * `@for`, `@if`, `@switch`
* Improved UI behavior and interactivity

---

### ✅ Day 4 - Services & Routing

* Created Services:

  * `CoursesService`

    * `getCoursesByCatID`
    * `getCourseByID`
  * `CategoriesService`

    * `getAllCategories`
* Implemented Angular Routing:

  * `/home`
  * `/about`
  * `/contact`
  * `/courses`
  * `/course/:id`
* Created Components:

  * Home
  * About
  * Contact
  * Courses
  * Course Details
* Navigation:

  * `routerLink`
  * `routerLinkActive`
* Added:

  * Default route → redirect to `/home`
  * Wildcard route → handle invalid URLs

---

### ✅ Day 5 - API Integration & Forms

* Integrated **MockAPI**
* Added API base URL in `environment.ts`
* Used `HttpClient` for API communication
* Updated Services:

  * `getAllCourses()`
  * `getCoursesByCategoryID()`
  * `getCourseByID()`
  * `addCourse()`
* Created new route:

  * `/insertcourse`
* Built form:

  * Two-way binding (`ngModel`)
  * Fields:

    * Title
    * Price
    * Image URL
    * Category
* Dynamic categories dropdown from API
* Submit functionality:

  * POST request
  * Redirect to courses page after success
* Managed subscriptions using:

  * `ngOnDestroy`

---

## 🎨 UI Features

* Responsive card layout
* Clean spacing & alignment
* Category filtering (All + specific categories)
* Interactive UI with directives
* Real-time updates

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Keroayman34/Angular-Training-ITI.git
cd Angular-Training-ITI/Products-App
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the project

```bash
ng serve
```

### 4️⃣ Open in browser

```
http://localhost:4200
```

---

## 🌐 Important Routes

| Route           | Description    |
| --------------- | -------------- |
| `/home`         | Home page      |
| `/about`        | About page     |
| `/contact`      | Contact page   |
| `/courses`      | Courses list   |
| `/course/:id`   | Course details |
| `/insertcourse` | Add new course |

---

## 🛠 Technologies Used

* Angular
* TypeScript
* HTML / CSS / Bootstrap
* RxJS
* MockAPI

---

## 💡 Key Concepts Learned

* Component-based architecture
* Custom directives & pipes
* Angular routing system
* Services & dependency injection
* HTTP requests & APIs
* Forms handling
* Observables & subscriptions

---

## 👨‍💻 Author

**Kerollos Ayman**
Angular Trainee - ITI

---

## ⭐ Notes

* Each day is implemented in a separate branch
* Final integrated version is in `master` branch
* Project follows modular and scalable structure

---
