<p align="center">
  <img width="300px" src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/src/images/ChattyAshley.png" alt="title and logo">
</p>

ChattyAshley is a realtime chat application that allows users to send messages to each other on a simple interface. As an homage to Twitch's origin, Justin.tv, and a reference to the common phrase Chatty Cathy, I decided to name my app ChattyAshley.

## Link to live site
https://chattyashley-f6fd4.web.app/

## Technologies & Languages
* Express
* React
* Firebase
  * Firestore for database
  * Firebase Admin SDK, Cloud Functions, Authentication, Hosting
* Typescript

## Important Packages
* Material - UI
* CORS
* Lodash
* React Firebase Hooks

## Installation

1. Clone the repository

    `git clone https://github.com/ashley-brown13/chatty-ashley.git`
    
2. Install dependencies in terminal
    ```
    cd client && npm install
    cd server && npm install
    ```
3. Signup for Firebase
4. Create a Firebase Project
5. In your Firebase Project Overview, get started by adding Firebase to your app
    1. Register your app
    2. Add Firebase SDK
6. Use your firebaseConfig details to create an .env file in the root of the client folder with the following:
    ```
    REACT_APP_API_KEY=<<apiKey>>
    REACT_APP_AUTH_DOMAIN=<<authDomain>>
    REACT_APP_PROJECT_ID=<<projectId>>
    REACT_APP_STORAGE_BUCKET=<<storageBucket>>
    REACT_APP_MESSAGING_SENDER_ID=<<messagingSenderId>>
    REACT_APP_APP_ID=<<appId>>
    REACT_APP_MEASUREMENT_ID=<<measurementId>>
    ```
    
