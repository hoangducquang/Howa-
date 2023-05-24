const { MongoClient } = require('mongodb');
const url = "mongodb+srv://projectblockchain:HDQMTnp05102001@cluster0.qyrt65b.mongodb.net/projectblockchain?retryWrites=true&w=majority";

let db;

async function connectToDB() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(); // Sử dụng cơ sở dữ liệu mặc định
}

function getDB() {
  return db;
}

module.exports = { connectToDB, getDB };