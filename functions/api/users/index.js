const { db } = require('../../config/index');
const firebase = require('firebase');

const {
  validateLoginData,
  validateSignUpData,
} = require('../../util/user-validator');

// Login
const loginUser = (request, response) => {
  const { email, password } = request.body;

  const { valid, errors } = validateLoginData(request.body);
  if (!valid) return response.status(400).json(errors);

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((error) => {
      console.error(error);
      return response
        .status(403)
        .json({ general: 'wrong credentials, please try again' });
    });
};

const signUpUser = (request, response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    username
  } = request.body;

  const { valid, errors } = validateSignUpData(request.body);

  if (!valid) return response.status(400).json(errors);

  let token, userId;
  return db.doc(`/users/${username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: 'this username is already taken' });
      } else {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      const userCredentials = {
        firstName,
        lastName,
        username,
        email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${username}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return response.status(400).json({ email: 'Email already in use' });
      } else {
        return response
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      }
    });
};

const getAllUsers = (request, response) => {
  db.collection('users')
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        const { firstName, lastName, username, phoneNumber, country, email, createdAt, userId } = doc.data();
        users.push({ usrId: doc.id, firstName, lastName, username, phoneNumber, country, email, createdAt, userId });
      });
      return response.status(200).json(users);
    })
    .catch((err) =>{
     console.log(err)
      return response
        .status(500)
        .json({ message: 'error occured while retriving', error: err });
    });
};

const getUserDetail = (request, response) => {
  let userData = {};
  db.doc(`/users/${request.params.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) { 
        userData.userCredentials = doc.data();
        return response.json(userData);
      }
      return response.json({ message: `User doesn't exist` });
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({ error: error.code });
    });
};

const updateUserDetails = (request, response) => {
  let document = db.collection('users').doc(`${request.body.username}`);
  document
    .update(request.body)
    .then(() => {
      return response.json({ message: 'Updated successfully' });
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({
        message: 'Cannot Update the value',
      });
    });
};

module.exports = { loginUser, signUpUser, getUserDetail, updateUserDetails, getAllUsers };
