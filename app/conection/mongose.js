//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB =' mongodb+srv://MDBScrum:MDBScrum20@cluster0.zd4ie.gcp.mongodb.net/helloTest?retryWrites=true&w=majority';

mongoose.connect(mongoDB,  { useUnifiedTopology: true, useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


db.once('open', () => {
    console.log('stay connect ');
});