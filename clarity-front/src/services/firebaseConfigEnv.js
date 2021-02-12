const firebaseConfig = {};
firebaseConfig.apiKey = process.env.apiKey;
firebaseConfig.authDomain = process.env.authDomain;
firebaseConfig.databaseURL = process.env.databaseURL;
firebaseConfig.projectId = process.env.projectId;
firebaseConfig.storageBucket = process.env.storageBucket;
firebaseConfig.messagingSenderId = process.env.messagingSenderId;
firebaseConfig.appId = process.env.appId;
firebaseConfig.measurementId = process.env.measurementId;

export default firebaseConfig;