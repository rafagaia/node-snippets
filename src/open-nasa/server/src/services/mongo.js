require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

//mongoose event emitter that emits events when connection is ready or when there's errors
//since only triggered once, can use 'once' instead of 'on', so that event only triggers callback once.
mongoose.connection.once('open', () => {
    console.log('MongoDB Connection Ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(`[MONGOOSE_ERROR] Connection Err: ${err}...`);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL); /*, {
        useNewUrlParser: true, //determines how mongoose parses URL string
        useFindAndModify: false, //disables outdated way of updating mongo data
        useCreateIndex: true, //uses create index way instead on old ensure index
        useUnifiedTopology: true //mongoose will use updated way of talking to clusters of mongo databases
    }*/ //commented out because we're using Mongoose version higher than 6.
}

module.exports =  {
    mongoConnect,
};