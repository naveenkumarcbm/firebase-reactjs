const deleteImage = (imageName) => {
    const bucket = admin.storage().bucket();
    const path = `${imageName}`;
    return bucket
      .file(path)
      .delete()
      .then(() => {
        return;
      })
      .catch((error) => {
        return;
      });
  };
  
  // Upload profile picture
  const uploadProfilePhoto = (request, response) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    const busboy = new BusBoy({ headers: request.headers });
  
    let imageFileName;
    let imageToBeUploaded = {};
  
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
        return response.status(400).json({ error: 'Wrong file type submited' });
      }
      const imageExtension = filename.split('.')[filename.split('.').length - 1];
      imageFileName = `${request.user.username}.${imageExtension}`;
      const filePath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filePath, mimetype };
      file.pipe(fs.createWriteStream(filePath));
    });
    deleteImage(imageFileName);
    busboy.on('finish', () => {
      admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filePath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
            },
          },
        })
        .then(() => {
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
          return db.doc(`/users/${request.user.username}`).update({
            imageUrl,
          });
        })
        .then(() => {
          return response.json({ message: 'Image uploaded successfully' });
        })
        .catch((error) => {
          console.error(error);
          return response.status(500).json({ error: error.code });
        });
    });
    busboy.end(request.rawBody);
  };