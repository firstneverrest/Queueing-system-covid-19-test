# Queueing COVID-19 test System
In order to understand how frontend and backend work together, I created this project which has both frontend and backend side separated from each other. 

Queueing COVID-19 Test System web application is created to manage COVID-19 test queue which include login, logout, show data and edit data features which users are divided into 2 categories: general user and admin. General user can see their profile and test status. In the other hand, Admin can edit all of the general user data.

## Technologies
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## Features
- Login and logout with JWT token send from server to client back and forth
- Page navigation with react-router
- General users can see their data when they have already logged in.
- Admin users can see all general users data and edit their data.
- All data are stored in mySQL database which use xampp to create database connection.

## Pages
### Main Menu - has login and sign up button
![image](images/mainmenu.jpg)

### Login - authenticate with username and password
![image](images/login.jpg)

### General User profile - shows their profile
![image](images/general_user_account.jpg)

### Admin Account - show all general user profile and edit buttons
![image](images/admin_account.jpg)

### Admin Edit User - edit user
![image](images/admin_edit_user.jpg)
