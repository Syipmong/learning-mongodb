const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('bson');

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

app.get('/api/user', (_, res) =>{
    res.status(200).json({ name: 'John Doe', age: 30 });
})

app.get('/books/:id', (_, res)=>{
    db.collection('books').findOne({ _id: new ObjectId(_.params.id)})
        .then(book => {
            res.status(200).json(book);
        })
        .catch(err => {
            res.status(500).json({ error: `could not fetch the document ${err}` });
        });
})


app.get('/api/v1/2024/books', (_, res)=>{
    db.collection('books').find({ publishedYear: 2019 }).toArray()
        .then(books => {
            res.status(200).json(books);
        })
        .catch(err => {
            res.status(500).json({ error: `could not fetch the documents ${err}` });
        });
})

// lets create a beautiful form to get and send data to our server
app.get('/form', (_, res)=>{
    res.send(`
        <form action="/submit-form" method="post">
            <input type="text" name="name" placeholder="Enter your name" />
            <input type="text" name="age" placeholder="Enter your age" />
            <button type="submit">Submit</button>
        </form>
    `)
})
