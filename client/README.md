Folder Structure
    /
        -public\n
        -src\n
            -assets\n
            -components\n
            -config\n
            -context\n
            -hooks\n
            -pages\n
                -Login.jsx --> login page\n
                -SignUp.jsx --> registartion page\n
                -Edit.jsx --> Updating data page\n
                -Dashboard.jsx --> Main page\n
                -UserProfile.jsx --> user Profile page\n
            -utils\n
            -App.js\n
            -main.js\n
        -index.html\n
        package.json\n

Steps  to run the project locally

1. open cmd or terminal in root directory and type the following command `npm install`
2. start the project by running `npm run dev`


*NOTE*
 for using firebase authentication such as google signin and email and password signin need to create a project in firebase console and copy the configuration files to `/src/config/firebaseConfig.js`

 1. go to console.firebase.google.com and login with google account
 2. click on + icon or create project and give the name of the project and click on continue
 3. click on add application to get the credentials
 4. click on web icon and give app name and copy the firebaseConfig 
 5. head over to authentication section and enable google signin and email and pasword providers
 6. head over to storage and create a storage and adjust the security rules (try in test mode)
 7. crete a folder named `uploads` in storage bucket 
