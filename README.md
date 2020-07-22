## Few pointers where you can start playing with app issues/refactoring/enhancements
1. Read message count is not correct always
2. Callbacks are used instead of promises
3. fire.js is doing too much
4. Mixing of concerns in code
5. Few more bugs
6. Can add a search component on ChatList where you can search users
7. If you wanna go beyond react, there are lot optimizations possible in the realtime database which can solve a lot of problems, especially on mobile devices.
8. App currently has only 2 hard code users (id 1, 2 ) who can chat together, you can make a service to create users, and then it will be a real chat app where you can search user and initiate chat.
9. Most interesting will be this app only works if the app is open no notifications implemented, now you can go serverless and simply host a function in google cloud to send notifications to the user in case the app is closed. (Search FCM for android and APNS for iOS).
10. Classes are used unnecessarily and can be converted to functional components
11. Many optimizations points bad code is left to play
12. Have Fun 🤨

#### App already points to a firebase realtime database if you want to play with only the React part you need NOT set up your own firebase feel free to use already configured configurations. BUT in this case, you have to change the users list of the app otherwise all the people who will use this app witch end up seeing one another's messages. To do so go to constant.js -> search for variable activeUserList and change the _id to some random long text so that it will remain unique. Do not make it 1, 2 and so on because many other people will do the same 😜

####  For setting up your own  firebase realtime database
1.  How to [https://firebase.google.com/docs/database](https://firebase.google.com/docs/database)
2.  Once you have created Project and app go to Authentication -> Turn on for anonymous user
3.  Go to Database -> Realtime Database -> Rules -> allow read /write like 
4.  Go to file fire.js and search for firebaseConfig variable and change configurations
5.  Go to the chatList.js and uncomment createChannel menthod for adding a new chat (once dynamic user support will be there this methos should call to create a channel not from componentDidMount)

#### How to distribute your build (.ipa / .akp files)
1. Generate build (.ipa / .apk)
2. Upload build to [https://www.diawi.com/](https://www.diawi.com/)
3. You can share the url generated in diawi and app will be install with this url

#### How to run the project:
1. Go to [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
2. Select tab ‘React Native CLI Quickstart’ (you can also try Expo but to keep things simple try CLI)
3. Simply follow the steps and app should run
