import firebase from 'firebase';
import {
  MESSAGES,
  CHANNELS,
  USERS,
  CHILD_ADDED,
  activeUserList,
} from './constants';
import {v4 as uuidv4} from 'uuid';

const firebaseConfig = {
  apiKey: 'AIzaSyB_JKKr0efSlsxc9J60bM0UPaNByPmxL-8',
  authDomain: 'reactbootcampchat.firebaseapp.com',
  databaseURL: 'https://reactbootcampchat.firebaseio.com',
  projectId: 'reactbootcampchat',
  storageBucket: 'reactbootcampchat.appspot.com',
  messagingSenderId: '97025247025',
  appId: '1:97025247025:web:4bfc3fe466a399fe625210',
};

class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    firebase.initializeApp(firebaseConfig);
    this.observeAuth();
  };

  // Auth
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({message}) {
        alert(message);
      }
    }
  };

  ref = (node) => firebase.database().ref(node);

  // Message/channel Receive
  on = (node, callback) =>
    this.ref(node)
      .limitToLast(20)
      .on(CHILD_ADDED, (snapshot) => {
        const val = snapshot.val();

        typeof val === 'object' && val !== null
          ? callback(this.parse(snapshot))
          : callback(val);
      });

  once = (node, callback) =>
    this.ref(node).once('value', (snapshot) => {
      const val = snapshot.val();

      typeof val === 'object' && val !== null
        ? callback(this.parse(snapshot))
        : callback(val);
    });

  //

  off(node) {
    this.ref(node).off();
  }

  parse = (snapshot) => {
    const {
      timestamp: numberStamp,
      text,
      activeUserList,
      user = {},
      recentMessage,
      seenNode,
    } = snapshot.val();
    const {key: _id} = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
      activeUserList,
      recentMessage,
      seenNode,
    };

    return message;
  };

  // Message Send
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  messagesNode = (channel) => `${CHANNELS}/${channel}/${MESSAGES}`;

  send = (channel) => (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        // id: uuidv4(),
        text,
        user,
        timestamp: this.timestamp,
      };
      this.ref(this.messagesNode(channel)).push(message); // Add message to message table
      this.ref(`${CHANNELS}/${channel}`).update({recentMessage: message}); // Add last message to channel
    }
  };

  // append = (message) => this.mesRef.push(message);

  createChannel = (channel) => {
    const {key} = this.ref(CHANNELS).push(channel);
    this.updateUserChannels(activeUserList, key);
  };

  setLastSeenMessage = (channel, message) => {
    this.ref(`${CHANNELS}/${channel}`).update({
      seenNode: {[message.user._id]: message._id},
    });
  };

  getUnseenMessages = (channel, user, callback) => {
    const {_id: channelId, seenNode: {[user._id]: seenNode} = {}} = channel;
    this.ref(`${CHANNELS}/${channelId}/${MESSAGES}`)
      .orderByKey()
      .startAt(seenNode || '')
      .on('child_added', (snapshot) => {
        callback(this.parse(snapshot));
      });
  };

  // Hard coded
  get getUser() {
    return activeUserList[0];
  }

  // push user to users on creating a channel.
  updateUserChannels = (users, channelId) => {
    users.map(({_id}) => {
      this.ref(`${USERS}/${_id}/${CHANNELS}`).push(channelId); // Add last message to channel
    });
  };
}

Fire.shared = new Fire();
export default Fire;
