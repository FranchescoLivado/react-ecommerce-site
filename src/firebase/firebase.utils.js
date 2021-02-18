import firebase from 'firebase/';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3nBhR5Y73ls4w_UvXNt3lJP9iOpeyDgk",
    authDomain: "crwn-react-practice-db.firebaseapp.com",
    projectId: "crwn-react-practice-db",
    storageBucket: "crwn-react-practice-db.appspot.com",
    messagingSenderId: "217196536141",
    appId: "1:217196536141:web:af77107c0d5bb1da701704",
    measurementId: "G-13KYZCHTR7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef =firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try{
            await userRef.set ({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
            })
        }catch (error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;

};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;