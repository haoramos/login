const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {MongoClient} = require('mongodb'); 

const app = express();

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'userData';
let db;

MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error("Failed to connect to MongoDB", err);
        return;
    }
    db = client.db(dbName); 
    console.log('Connected to MongoDB');

    // Create the database if it doesn't exist
    db.createCollection('user', (err, collection) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Collection created');
    }
    });
});

app.post('/api/register', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Checar se o usuário já existe
    const userCollection = db.collection('user');
    
    // Se o usuário não existir, vamos adicionar
    userCollection.insertOne({ username, password }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to register user' });
        }

        res.status(200).json({ message: 'User registered successfully' });
    });
});



app.listen(3000, () => {
    console.log('Server running on port 3000');
});