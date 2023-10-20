const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.post('/users', async (req, res) => {
            const user = req.body;
            const database = client.db("insertDB");
            const userData = database.collection("userData");
            const result = await userData.insertOne(user);
            res.send(result);
        });
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