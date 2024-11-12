const express = require('express');
//const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();


//database coonection 
mongoose.connect('mongodb+srv://joshirahulvadivel:mongo_password@cluster0.bjfr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/', require('./routes/authRoutes'))

const port = 8000;

app.listen(port, ()=> console.log(`server is running on port ${port}`)) 
