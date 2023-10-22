const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//taiefsiddik2
//XGAwejOhZUYdQ1He

// 211902037
// t03KsS5osZ6BizD6



const uri = "mongodb+srv://taiefsiddik2:XGAwejOhZUYdQ1He@cluster0.nebbavw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const database = client.db("insertDB");
        const userData = database.collection("userData");
        app.get('/users', async (req, res) => {
            const cursor = userData.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const user = await userData.findOne(query);
            res.send(user)
            console.log(user)
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userData.insertOne(user);
            res.send(result);
        });
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            console.log(user);
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    emai: user.email,
                }
            }
            const result = await userData.updateOne(filter, updatedUser, options);
            res.send(result)
        })
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: new ObjectId(id) };
            const result = await userData.deleteOne(query);
            res.send(result)
        })
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        //await client.close();
    }
}
run().catch(console.log);


app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port);