const mogoose = require('mongoose')

const dbConection = async()=>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/test');

    } catch (error) {
        console.log(error);
        throw new error('error de inicializar el BD')
    }
}