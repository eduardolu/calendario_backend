const express  = require("express");
require ('dotenv').config();

const app = express();

//directorio publico
app.use( express.static('public'));


//rutas
app.use('/api/auth',require('./routes/auth'));
//eventos

//escuchar peticiiones

app.listen(process.env.PORT,()=>{
    console.log(`servidor en puerto ${process.env.PORT}`);
})
