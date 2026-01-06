import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔴 এখানে শুধু config বসাবে
const firebaseConfig = {
  apiKey: "AIzaSyC6fcZ7_y2iF2X7V2a875pJT06P...",
  authDomain: "asists-5af9e.firebaseapp.com",
  projectId: "asists-5af9e",
  storageBucket: "asists-5af9e.appspot.com",
  messagingSenderId: "349107335670",
  appId: "1:349107335670:web:8228623e71d080..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===== AUTH =====
window.login = () =>
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => location = "index.html")
    .catch(e => alert(e.message));

window.signup = () =>
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => location = "index.html")
    .catch(e => alert(e.message));

window.logout = () =>
  signOut(auth).then(() => location = "auth.html");

// ===== SAVE / LOAD =====
window.saveDoc = async () => {
  const user = auth.currentUser;
  if (!user) return;
  await setDoc(doc(db, "documents", user.uid), {
    content: editor.value,
    updatedAt: Date.now()
  });
  alerts.innerText = "Saved ✔";
};

onAuthStateChanged(auth, async user => {
  if (!user && location.pathname.includes("index"))
    location = "auth.html";

  if (user && location.pathname.includes("index")) {
    const snap = await getDoc(doc(db, "documents", user.uid));
    if (snap.exists()) editor.value = snap.data().content;
  }
});
