const admin = require('firebase-admin');
const config = require('../../others/config.json')

// remove before productionizing
admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: "https://navvani.firebaseio.com"
  });
// for production 
//admin.firestore();

const db = admin.firestore()

module.exports = { admin, db };
