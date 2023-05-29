const express = require('express');
const path = require('path');
const app = express();
// const hostname = 'localhost'
const mongoose = require('mongoose'); //mongoose

main().catch(err => console.log(err)); //mongoose

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/loginkarodb')
}
const port  = 80;

const contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const logindb = mongoose.model('logindb',contactSchema);

// express related stuff
// app.use('/static',express.static('static')) //for serving static files
app.use(express.urlencoded()) //data collection "OLD"

// PUg related stuff
app.set('view engine','pug') //set the templste engine
app.set('views',path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/contact',(req,res)=>{
    // "OLD"
    const params = { };
    res.status(200).render('contact.pug',params);
})


// setting up post reqest for contact us
app.post('/contact',(req,res)=>{

    var myData = new logindb(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the databse");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
})

// start the server
app.listen(port,()=>{
    console.log(`The application started successfully at the port 80`);
})