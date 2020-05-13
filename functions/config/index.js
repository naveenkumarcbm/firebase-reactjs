const admin = require('firebase-admin');

// remove before productionizing
// const config = require('../../others/config.json')
// admin.initializeApp({
//     credential: admin.credential.cert(config),
//     databaseURL: "https://navvani.firebaseio.com"
//   });
// for production 
admin.initializeApp();

const db = admin.firestore()

module.exports = { admin, db };
