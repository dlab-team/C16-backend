const firebaseAdmin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app =  firebaseAdmin.initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = auth;