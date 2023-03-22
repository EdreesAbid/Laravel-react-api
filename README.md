# Laravel-react-api
In this app I use Laravel with React in seperated directories, along with react I used Axios to communicate with the backend and it also supports the Promise API that is native to JS ES6. Used SweetAlert2 wich is a beautiful, responsive, customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes.

Steps to install the app.

1- download "laravel-react-api.zip" file and extract it in the server.

2- set your database configuration in .env file located in laravel-server directory.

3- run "composer install" commend in laravel-server directory.

4- run "php artisan migrate" commend to created tables.

5- run "npm install" commend in react-client dirctory.

6- make Apache and MySql started if you used xampp.

7- run "php artisan serve" commend in laravel-server directory to make laravel ready for development.

8- run "npm start" commend in react-client directory to make react ready for development. 

9- finally you can access app by "http://localhost:3000/" browser url.


Note: When you all done and the application get started, import more than 10 users by the button provide on home page to chesk infinite scrolling functionality. 
