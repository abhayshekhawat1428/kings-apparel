import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyCT51eAvo-SzefgrxXtL3jEqgqasZZ1PgE",
    authDomain: "kings-db-6b3cb.firebaseapp.com",
    databaseURL: "https://kings-db-6b3cb.firebaseio.com",
    projectId: "kings-db-6b3cb",
    storageBucket: "kings-db-6b3cb.appspot.com",
    messagingSenderId: "723750920879",
    appId: "1:723750920879:web:315afe03d698cdd8e6aa5a",
    measurementId: "G-V3EGC9F2KB"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        const { displayName ,email } = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user',error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () =>auth.signInWithPopup(provider);

export default firebase;