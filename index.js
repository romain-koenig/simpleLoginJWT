const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');

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

//import routes

const authRoutes = require('./routes/auth');

//Route Middleware

app.use('/api/user', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
