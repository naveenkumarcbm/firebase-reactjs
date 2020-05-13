const { admin, db } = require('../config/index');

const auth = async (request, response, next) => {
  let idToken;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = request.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return response.status(403).json({ error: 'Unauthorized' });
  }
  return admin
    .auth()
    .verifyIdToken(idToken)
		.then((decodedToken) => {
      request.user = decodedToken;
      console.log(request.user.email)
			return db.collection('users').where('email', '==', request.user.email).limit(1).get();
    })
      // db.collection('users').where('email', '==', request.params.email).limit(1).get().then(data => {
  //   return response.status(200).json(data.docs[0].data());
  // })
		.then((data) => {
      console.log(data)
			request.user.username = data.docs[0].data().username;
			request.user.imageUrl = data.docs[0].data().imageUrl;
			return next();
		})
    .catch((err) => {
      console.error('Error while verifying token', err);
      return response.status(403).json(err);
    });
};

module.exports = auth;
