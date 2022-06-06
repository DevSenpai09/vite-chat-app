import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onChildAdded,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

const config = {
  apiKey: "AIzaSyAboQdEhqtVIB9dIWmu5UWzR2O2dhLB4ds",
  authDomain: "vitechatapp.firebaseapp.com",
  projectId: "vitechatapp",
  storageBucket: "vitechatapp.appspot.com",
  messagingSenderId: "66616898030",
  appId: "1:66616898030:web:76b2fc97ef6fa7e781deff",
};

const app = initializeApp(config);
const db = getDatabase();
const reference = ref(db, "Messages/");

export const sendMessage = (name, message) => {
  if (message !== "") {
    set(push(reference), {
      username: name,
      content: message,
    });
  }
};

export const fetchMessages = (state) => {
  let messages = [];

  onChildAdded(reference, (data) => {
    const childKey = data.key;
    const childData = data.val();
    messages.push({
      id: childKey,
      username: childData.username,
      content: childData.content,
    });
    state.messages = messages;
    console.log(state.messages);
  });
};

// onChildAdded(reference, (data) => {
//   console.log(data.val());
// });
