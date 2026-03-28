# Overview CSE 310 - Web-Based To-Do List

# Author : Diogo Rangel Dos Santos

## Overview
# Task Card Manager - WebApp (Java Edition)

## 📌 Overview
This project is a full-stack Task Management application developed as part of a technical module focused on **Software Engineering and Web Development**. Originally conceived in Node.js, the application was transitioned to a **Java (Spring Boot)** architecture to implement a robust WebApp service integrated with a relational database.

## 🚀 Technologies Used
- **Backend:** Java 17 with Spring Boot Framework.
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, and CSS3.
- **Database:** SQLite (Relational Schema).
- **Build Tool:** Maven.
- **ORM:** Spring Data JPA (Hibernate).

## 🛠️ Key Features & Requirements
- **Web Service:** RESTful API implementation for Task CRUD (Create, Read, Update, Delete).
- **Relational Data:** Integration with SQLite using Foreign Keys for User-Task relationships.
- **Interactive UI:** Dynamic card rendering using JavaScript loops.
- **User Validation:** Conditional logic for task deletion (Confirmation Dialog) and form validation.
- **Clean Code:** Use of Lombok to reduce boilerplate code and maintain modularity.

## 📥 How to Run
1. Ensure you have **JDK 17** and **Maven** installed.
2. Clone the repository.
3. Run the application using the Maven Wrapper:
   ```bash
   ./mvnw spring-boot:run

## Software Demo Video
* [Link to your YouTube/Loom video here](https://www.loom.com/share/cd1f96d98c51470e82a097d38285f973)
* [Link of website live](https://diogorangel.github.io/project-todolist-js/Todolist.html)

## Development Environment
* Language: JavaScript (Vanilla)
* Tools: Visual Studio Code, Google Chrome DevTools

## Useful Websites
* [MDN Web Docs - Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
* [JavaScript.info - DOM Nodes](https://javascript.info/dom-nodes)

## Future Work
* Add "Local Storage" so tasks stay even after refreshing the page.
* Add a "Clear All" button.
* Implement task categories (Work, Personal, etc.).