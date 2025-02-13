import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyB8HTmwtPyWba88x9_SDH20mPygivUUPDE",
    authDomain: "solmate-22169.firebaseapp.com",
    projectId: "solmate-22169",
    storageBucket: "solmate-22169.firebasestorage.app",
    messagingSenderId: "1061089944142",
    appId: "1:1061089944142:web:136eaac7efdcf8e00e591f",
    measurementId: "G-6FLMPH78H2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
      messageDiv.style.opacity=0;
  },5000);
}

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
  event.preventDefault();
  const email=document.getElementById('rEmail').value;
  const password=document.getElementById('rPassword').value;
  const firstName=document.getElementById('fName').value;
  const lastName=document.getElementById('lName').value;

  const auth=getAuth();
  const db=getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
      const user=userCredential.user;
      const userData={
          email: email,
          firstName: firstName,
          lastName:lastName
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef=doc(db, "users", user.uid);
      setDoc(docRef,userData)
      .then(()=>{
          window.location.href='sign.html';
      })
      .catch((error)=>{
          console.error("error writing document", error);

      });
  })
  .catch((error)=>{
      const errorCode=error.code;
      if(errorCode=='auth/email-already-in-use'){
          showMessage('Email Address Already Exists !!!', 'signUpMessage');
      }
      else{
          showMessage('unable to create User', 'signUpMessage');
      }
  })
});

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
  event.preventDefault();
  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;
  const auth=getAuth();

  signInWithEmailAndPassword(auth, email,password)
  .then((userCredential)=>{
      showMessage('login is successful', 'signInMessage');
      const user=userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href='hmeage.html';
  })
  .catch((error)=>{
      const errorCode=error.code;
      if(errorCode==='auth/invalid-credential'){
          showMessage('Incorrect Email or Password', 'signInMessage');
      }
      else{
          showMessage('Account does not Exist', 'signInMessage');
      }
  })
})
