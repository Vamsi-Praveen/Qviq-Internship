Folder Structure
    /
        -public
        -src
            -assets
            -components
            -config
            -context
            -hooks
            -pages
                -Login.jsx --> login page
                -SignUp.jsx --> registartion page
                -Edit.jsx --> Updating data page
                -Dashboard.jsx --> Main page
                -UserProfile.jsx --> user Profile page
            -utils
            -App.js
            -main.js
        -index.html
        package.json

Steps  to run the project locally

1. open cmd or terminal in root directory and type the following command `npm install`
2. start the project by running `npm run dev`


*NOTE*
 for using firebase authentication such as google signin and email and password signin need to create a project in firebase console and copy the configuration files to `/src/config/firebaseConfig.js`

 1.go to console.firebase.google.com and login with google account
 2.click on + icon or create project and give the name of the project and click on continue
 3.click on add application to get the credentials
 4.click on web icon and give app name and copy the firebaseConfig 
 5.head over to authentication section and enable google signin and email and pasword providers
 6.head over to storage and create a storage and adjust the security rules (try in test mode)
 7.crete a folder named `uploads` in storage bucket 
