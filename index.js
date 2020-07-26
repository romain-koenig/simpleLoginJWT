const express = require('express');
const app = express();

//import routes

const authRoutes = require('./routes/auth');

//Route Middleware

app.use('/api/user', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
