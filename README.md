<p align="center">
  <img src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/src/images/ChattyAshley.png" alt="title and logo">
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
7. In your Firebase Console:
    1. Select Authentication from the menu: Enable Google as a Sign-in method
    2. Select Firestore Database: Create a database
        1. Enter the Rules tab: Replace with the following & publish
            ```
            rules_version = '2';
            service cloud.firestore {
            match /databases/{database}/documents {
             match /{document=**} {
              allow read, write: if request.auth != null;
              }
             }
            }
            ```
        2. In the Data Tab:
            1. Create a 'users' collection, and add its first document (select Auto-ID to generate document ID) with the following fields (all strings): 
                ```
                displayName: <<make up a test displayName>>
                photoURL: <<enter a desired photoURL>>
                email: <<make up a test email>>
                uid: <<make up a random series of characters>>
                ```
             2. Create a 'messages' collection, and add its first document (select Auto-ID to generate document ID) with the following fields (all strings, except createdAt, which is a timestamp) :
                ```
                createdAt: <<select a date and time>>
                displayName: <<same as above>>
                photoURL: <<same as above>>
                email: <<same as above>>
                messageBody: <<make up a message>>
                ```
          3. Select the Gears icon right next to Project Overview, select Project Settings, go to Service Accounts tab
              1. In the Firebase Admin SDK menu: Generate new private key
              2. Download & Rename "serviceAccountKey.json"
              3. Place this file in server/src/config 

8. Start the server & client in the terminal:
    ```
    cd client && npm run dev
    cd server && npm start
    ```
    
# High Level Overview

## Components

### Landing Page/Authentication

The landing page allows users to sign-in to the application with their Google accounts. If I was to build this component out, I would include other OAUTH sign-ins from Facebook and Github.

<p align="center">
  <img src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.39.57%20AM.png" alt="login page">
</p>

<p align="center">
  <img src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%205.45.36%20AM.png" alt="auth">
</p>

### Chat Page

The Chat Page includes the live message board and form for sending your message. The message board scroll is programmed to update each time a message is added, so that users always know when a new message has arrived. In addition, I utilized Lodash and a useRef hook to implement a 'Scroll to Bottom' button that reveals itself when a user moves from the bottom view of the message board.

<p align="center">
  <img src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.41.23%20AM.png" alt="chat page">
</p>

### Error Modals

Utilizing Material-UI's Dialog component, I created a reusable error modal that pop-ups if there is an issue with login or sending/receiving messages.

<p align="center">
  <img width="800" src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%205.00.08%20AM.png" alt="dialog code">
</p>

<p align="center">
  <img width="800" src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.39.37%20AM.png" alt="login error">
</p>

<p align="center">
  <img width="800" src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.42.17%20AM.png" alt="server error">
</p>



This is a snapshot of my GET request to the Firebase API ( https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel), which returns the messages from my Firestore database:

```
100

[[1,[{
  "targetChange": {
    "targetChangeType": "ADD",
    "targetIds": [
      2
    ]
  }
}
]]]811

[[2,[{
  "documentChange": {
    "document": {
      "name": "projects/chattyashley-f6fd4/databases/(default)/documents/messages/N4Ozn9rwSmh5R0ccgRKO",
      "fields": {
        "createdAt": {
          "timestampValue": "2021-07-29T11:44:22.895Z"
        },
        "photoURL": {
          "stringValue": "https://lh3.googleusercontent.com/a-/AOh14GiDduMfVBkFNNtHDYxZe_TaGlgefYAgVxs4LEXHzQ=s96-c"
        },
        "messageBody": {
          "stringValue": "I hear you running!"
        },
        "email": {
          "stringValue": "ashleybrown101789@gmail.com"
        },
        "displayName": {
          "stringValue": "Ashley Brown"
        }
      },
      "createTime": "2021-07-29T11:44:22.918706Z",
      "updateTime": "2021-07-29T11:44:22.918706Z"
    },
    "targetIds": [
      2
    ]
  }
}
]]]797
```
    
 
    
