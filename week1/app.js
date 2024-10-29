const express = require('express');
const { connectToDb, getDb } = require('./db');

const app = express();
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => console.log('Listening on Port 3000'));
        db = getDb();
    }
});

app.get('/books', (_, res) => {
    db.collection('books').find().sort({ author: 1 }).toArray()
        .then(books => {
            res.status(200).json(books);
        })
        .catch(err => {
            res.status(500).json({ error: `could not fetch the documents ${err}` });
        });
});

app.get('/books/:id', (_, res)=>{
    db.collection('books').findOne({ _id: id })
        .then(book => {
            res.status(200).json(book);
        })
        .catch(err => {
            res.status(500).json({ error: `could not fetch the document ${err}` });
        });
})
