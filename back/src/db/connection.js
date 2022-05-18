const mongoose = require('mongoose');

mongoose.connect(process.env.DB_MONGO_ATLAS, {
    useNewUrlParser: true
}).then(con => {
    console.log(`MogoDB Database connected with HOST: ${con.connection.host}`);
}).catch(e => {
    console.log(e.message);
});