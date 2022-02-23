var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var schema = require('../schema/schema');
const cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb:27017/stas1', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));
db.once('open', function(){
  console.log('DB Connected!');
})

const app = express();
const PORT = 3005;

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true,
}));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});