import mongoose from "mongoose";
import environment from './environment.js';

mongoose.connect(`mongodb://127.0.0.1:27017/${environment.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log("successfully connected to database");
});

export default mongoose;