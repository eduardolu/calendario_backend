const express  = require("express");
const { dbConection } = require("./database/config");
require ('dotenv').config();

const app = express();

//bbdd
dbConection();

//directorio publico
app.use( express.static('public'));

//lectura y parseo del body JSON
app.use( express.json());

//rutas
app.use('/api/auth',require('./routes/auth'));
//eventos

//escuchar peticiiones

app.listen(process.env.PORT,()=>{
    console.log(`servidor en puerto ${process.env.PORT}`);
})
