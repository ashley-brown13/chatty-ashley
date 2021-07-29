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

To build ChattyAshley, I utilized Express for my backend, React with Typescript for my frontend, and Firebase for my database/3rd party API. I used Firebase as it allows real time updates without having to implement my own WebSockets; I also decided to utilize it's other features, which include authentication and hosting. It was my first time using both Typescript and most of the Firebase features. Though it was challenging, I really feel happy with the result, and I am so glad I got to learn these technlogies through project-based learning, as it is my preferred way to learn. 

## Components

### LoginPage with OAUTH Authentication

The landing page is essentially a login page that allows users to sign in to the application with their Google accounts. All users are required to login before seeing the main chat page. If I was to build this component out further, I would also users to sign in through GitHub and Facebook.

<p align="center">
  <img src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.39.57%20AM.png" alt="login page">
</p>

<p align="center">
  <img src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%205.45.36%20AM.png" alt="auth">
</p>

### Chat Page: MessageBoard/MessageForm/IndividialMessage

The Chat Page includes the live message board and the form for sending your message. The message board scroll is programmed to update each time a message is added, so that users always know when a new message has arrived. In addition, I utilized the Lodash debounce function and react hooks to implement a 'Scroll to Bottom' button that reveals itself when a user moves from the bottom view of the message board.

As generally standard for chat applications, I placed the sender's messages on the right of the message board, and the other users' messages on the left.

Though this chat application currently only has one channel, if I was to continue building it out, I would allow users to create additional channels. This could be implemented with Firestore subcollections. I would also add a sidebar that show all users that are currently present in the app.

<p align="center">
  <img src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.41.23%20AM.png" alt="chat page">
</p>

```
  const scroll = useRef<HTMLDivElement>(null);
  const [listOfMessages, loading, error]= useCollectionData(grabMessages);
  const [hide, setHide] = useState<Hide>(true)

  const handleScroll = (e) => {
    const bottom: boolean = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setHide(true);
    }
    if(!bottom && hide){
      setHide(false);
    }
  }

  const scrollToBottom = () => {
    scroll?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [listOfMessages]);

  return (
    <div className="message-board">
      <Box
        border={2}
        borderColor="text.primary"
        borderRadius={16}
        display="flex"
        flexDirection="column"
        p="20px"
        bgcolor="black"
        height="90%"
        width="100%"
        id="message-board-box"
        onScroll={debounce(handleScroll, 500)}
      >
        {!hide && <span id="positioned"><Button hidden={hide} variant="contained" color="secondary" onClick={scrollToBottom}>Scroll to Bottom</Button></span>}
        {listOfMessages && listOfMessages.map(message => <IndividualMessage key={message.createdAt} message={message} authUser={authUser} />)}
        <span ref={scroll}></span>
      </Box>
    </div>
  );
  ```

### ErrorNotification

Pop-up modal that appears if there is a login or server error.

<p align="center">
  <img width="800" src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.39.37%20AM.png" alt="login error">
</p>

<p align="center">
  <img width="800" src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.42.17%20AM.png" alt="server error">
</p>

## User Interactions

1. Login 
2. Logout
3. Send Message
4. Read Messages
5. Scroll to Bottom Feature
6. Accepting error notifications if necessary

## UI Design
To implement good accessibility for a variety of users, I made sure to implement high color contrast between the text and it's background color. I also tried to use explicit descriptions on buttons and forms so as not to confuse readers about the basic functions of the website.

Material-UI provided me with a lot of well-designed React UI components. I utilized the following in my application:
* Box: Scrollable container for the message board.
* Dialog: Error notifications
* Icons: Icon within Send Message Button
* Button: Login, Logout, Scroll to Bottom, Send
* TextField: Form for writing message
* Avatar: Shows user photos to the right or left of messages (depending on if you are sender or recipient)

One of my favorite Material-UI's components is the Dialog. It allowed me to create a clean, reusable error modal that pop-ups if there is an issue with login or sending/receiving messages.

<p align="center">
  <img width="800" src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%205.00.08%20AM.png" alt="dialog code">
</p>

## Reusable Components

1. ErrorNotification Component: Makes the error specific to login error, send message error, or message loading error.
2. IndividualMessage Component: Creates each individual message with the messageBody, user avatar, date, and display name. It utilizes the user's email to separate and organize the messages based on if the user is the owner or a recipient. 

<p align="center">
  <img width="800" src="https://github.com/ashley-brown13/chatty-ashley/blob/main/client/public/images/Screen%20Shot%202021-07-29%20at%204.58.43%20AM.png" alt="individual message reusable component">
</p>

## My Express Server

As this was a small application, my server only required two routes:

* api/login
  * This route logs the user into my application. If it is their first time logging in their information gets saved to my 'users' collection.

* api/messages/send
  * This route sends the user message to my Firestore 'messages' collection. To add extra security, I leveraged Firebase ID tokens.

## My Database

I utilized a Firestore database, which is a NoSQL database. I have two collections: 

1. users
    ```
    |Column Name  | Data Type   | 
    | ----------- | ----------- | 
    | uid         | string      | 
    | displayName | string      | 
    | email       | string      | 
    | photoURL    | string      |  
    ```
2. messages
    ```
    |Column Name  | Data Type   | 
    | ----------- | ----------- | 
    | messageBody | string      | 
    | displayName | string      | 
    | email       | string      | 
    | photoURL    | string      |  
    | createdAt   | timestamp   | 
    ```

## 3rd Party API
I really enjoyed interacting with the Firebase API. Though there are a lot of configurations at the start, their functions are very intuitive, and can be used on both client and server sides. Though I used a server for this project as the guidelines require, I actually think that I would create a serverless version of this project if I was to re-factor it. Because Firebase offers options like OAUTH and functions that allow API calls on the client side, I think the application would be more efficient if it did not have to hit the server first.

My code to get the messages:
```
const firestore: firebase.firestore.Firestore = firebase.firestore();
const messageCollection: firebase.firestore.CollectionReference = firestore.collection('messages');
export const grabMessages = messageCollection.orderBy('createdAt').limitToLast(50);
const [listOfMessages, loading, error]= useCollectionData(grabMessages);
```

This is a snapshot of the response of my GET request https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel, which returns the messages from my Firestore database:

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

## MVC Architectural Pattern

I utilized the MVC architectural pattern, which allowed me to separate concerns and keep a well organized file structure. On the client side, I separated my API calls into controller login and message files, so my view was not encumbered by server-side knowledge (with the exception of my call to grab the messages as that needed to be in the component to implement the real time reception of the messages). I also created controller functions on the backend. The server user controller contains the logic of checking if users exist in the database, as well as adding them if they do not. In the message controller, I housed the function to verify the user's ID token, and upon acceptance of that, add their message to the database. I really enjoy how controllers keep my code more concise and readable, as well as making it easier to find/change code in the future for refactoring and expanding.




    
 
    
