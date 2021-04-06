const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const {init} = require('./db/db');
const {graphqlHTTP} = require('express-graphql');
const {schema, root} = require('./schema/crud')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(express.static('assets'));
app.set('views', path.join(__dirname, './views'));  
app.set("view engine", "hbs");

const IndexRouter = require('./routes/index');
const CreateRouter = require('./routes/create');
const EditRouter = require('./routes/edit');
const DeleteRouter = require('./routes/delete');

app.use('/', IndexRouter);
app.use('/create', CreateRouter);
app.use('/edit', EditRouter);
app.use('/delete', DeleteRouter);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

init().then(() => { 
   app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
})