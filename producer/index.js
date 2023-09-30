import http from 'node:http';
import { Kafka, Partitioners } from 'kafkajs';
import { MongoClient, ServerApiVersion } from "mongodb";
// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017/?directConnection=true";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db = client.db("quickstart");
    const collection = db.collection("sampleData");
    await collection.insertOne({data: "novos dados!"});
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



const kafka = new Kafka({clientId: "producer", brokers: ['localhost:9092']});
const producer = kafka.producer({createPartitioner: Partitioners.DefaultPartitioner});

// await producer.connect();
// await producer.send({
//   topic: 'test-topic',
//   messages: [
//     {value: "hello Kafkajs user!"}
//   ]
// });

const consumer = kafka.consumer({ groupId: 'test-group' })

await consumer.connect()
await consumer.subscribe({ topic: 'quickstart.sampleData' /*'test-topic'*/, fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  },
})

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('{"hello": "world!"}');

});

server.listen(3000, ()=> console.log("Listening on 3000"));
