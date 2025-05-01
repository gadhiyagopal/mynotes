// connect with mongoDB using Mongoose
const connectWithMongo = require('./database');
connectWithMongo();

// Create API using express
const express = require('express')
const app = express()
const port = 5000

// cors
var cors = require('cors')

// Middleware
app.use( express.json() );
app.use(cors())

// Welcome Routes
app.get('/', (req, res) => {
  res.send('Hello NOVA!')
})

// Available Routes
app.use('/api/user',require('./Routes/user'));
app.use('/api/note',require('./Routes/notes'));

app.listen(port, () => {
  console.log(`MyNotes Backend listening on port ${port}`)
})