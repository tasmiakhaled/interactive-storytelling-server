const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lqoavff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const sciFiCollection = client.db("storytelling").collection("scifi");

    app.get('/scifi', async (req, res) => {
      const scifi = await sciFiCollection.find().toArray();
      res.send(scifi);
    })

    const mysteryCollection = client.db("storytelling").collection("mystery");

    app.get('/mystery', async (req, res) => {
      const mystery = await mysteryCollection.find().toArray();
      res.send(mystery);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('storytelling server going on')
})

app.listen(port, () => {
  console.log(`BranchTales is running on port ${port}.`)
})