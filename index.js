const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.436gp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const toolsCollection = client.db('tools-manufacturer').collection('tools');
        const reviewsCollection = client.db('tools-manufacturer').collection('reviews');

        // get all tools
        app.get('/tools', async (req, res) => {
            const result = await toolsCollection.find({}).toArray();
            res.send(result);
        });

        // get a specific tool by id
        app.get('/tools/:id', async (req, res) => {
            const id = req.params.id;
            const result = await toolsCollection.findOne({ _id: ObjectId(id) });
            res.send(result);
        });

        // get all reviews
        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollection.find({}).toArray();
            res.send(result);
        });

    }
    finally { }
};

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// https://tools-manufacturer.herokuapp.com