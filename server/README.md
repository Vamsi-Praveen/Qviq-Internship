Steps to run the project locally

1.create a file named .env in root folder
2.and type PORT=4000 and MONGODB_URL="mongodburl"
3.open cmd or terminal in project root folder and type `npm install` for installing dependencies
4.now type `npm run dev` for running project in development mode using nodemon or `npm start` for start the project
5.open browser and navigate to `http://localhost:4000/api` and it shows message API is running

*ENDPOINTS*
-  get -> /api : To check server is working
-  post -> /api/register : For user sign up
-  get  -> /api/get-user/:id : For getting user information based on userid
-  delete -> /api/delete-user/:id : For deleting the user
-  put -> /api/update-user/:id : For updating the user
- post -> /api/get-user-email : For getting user information based on email
