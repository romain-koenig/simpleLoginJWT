const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 

//import routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

dotenv.config();

//connet to DB

mongoose.connect(process.env.MONGODB_CONNECT,
{
  useUnifiedTopology: true,
  useNewUrlParser: true
},
() => {
  console.log(`Connected to DB`);
});

//Middleware so we can read post requests
app.use(express.json());

//Route Middleware

app.use('/api/user', authRoutes);

app.use('/api/posts', postRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
