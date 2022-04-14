import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import * as firebase from 'firebase/app';

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBTbZrS1MGZpYbluXR4HrawiGF1OUDuyLw',
    authDomain: 'react-chat-87e3f.firebaseapp.com',
    projectId: 'react-chat-87e3f',
    storageBucket: 'react-chat-87e3f.appspot.com',
    messagingSenderId: '548346348291',
    appId: '1:548346348291:web:650969096a8d9c93a45f36',
});

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const FirebaseContext = createContext(null);

ReactDOM.render(
    <FirebaseContext.Provider
        value={{
            auth,
            firestore,
            firebase,
        }}
    >
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root')
);
