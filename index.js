const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

// jwt function
function verifyJWT(req, res, next) {
    // bearer... token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    };
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        req.decoded = decoded;
        next();
    });
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.436gp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const toolsCollection = client.db('tools-manufacturer').collection('tools');
        const reviewsCollection = client.db('tools-manufacturer').collection('reviews');
        const userCollection = client.db('tools-manufacturer').collection('users');
        const orderCollection = client.db('tools-manufacturer').collection('orders');

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

        // decrease quantity when ordered
        app.put('/tools/:id', async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedQuantity = {
                $set: {
                    available_quantity: body.available_quantity
                },
            };
            const result = await toolsCollection.updateOne(filter, updatedQuantity, options);
            res.send(result);
        });

        // get all reviews
        app.get('/reviews', verifyJWT, async (req, res) => {
            const result = await reviewsCollection.find({}).toArray();
            res.send(result);
        });

        // post order
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        // get order by email
        app.get('/orders/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const result = await orderCollection.find({email: email}).toArray();
            res.send(result);
        });

        // delete order
        

        // user
        app.put('/users/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET);
            res.send({ result, token });
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