const { db } = require('../../config/index');
const CONSTANTS = require('../../constants/index');

const getAllItem = (req, res) => {
  db.collection(CONSTANTS.BASE_COLLECTION)
    .orderBy(CONSTANTS.CREATED_AT)
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        const { title, body, createdAt } = doc.data();
        todos.push({
          todoId: doc.id,
          title: title,
          body: body,
          createdAt: createdAt,
        });
      });
      return res.status(200).json(todos);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

const addItem = (req, res) => {
  const { title, body } = req.body;
  if (body.trim() === '') {
    return res.status(400).json({ body: 'Must not be empty' });
  }

  if (title.trim() === '') {
    return res.status(400).json({ title: 'Must not be empty' });
  }

  const newItem = {
    title,
    body,
    createdAt: new Date().toISOString(),
  };
  return db
    .collection(CONSTANTS.BASE_COLLECTION)
    .add(newItem)
    .then((doc) => {
      const responseTodoItem = newItem;
      responseTodoItem.id = doc.id;
      return res.json(responseTodoItem);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

const updateItem = (req, res) => {
  const { title, body } = req.body;
  if (req.body.todoId || req.body.createdAt) {
    return res.status(403).json({ message: 'Not allowed to edit' });
  }
  let document = db
    .collection(CONSTANTS.BASE_COLLECTION)
    .doc(`${req.params.id}`);
  return document
    .update({ body, title })
    .then(() => {
      return res.json({ message: 'Updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: err.code,
      });
    });
};

const deleteItem = (req, res) => {
  const document = db.doc(`/${CONSTANTS.BASE_COLLECTION}/${req.params.id}`);
  return document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      return document.delete();
    })
    .then(() => res.json({ message: 'Delete successfull' }))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

module.exports = { getAllItem, addItem, updateItem, deleteItem };
