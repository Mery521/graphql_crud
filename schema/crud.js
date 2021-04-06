const {buildSchema} = require('graphql');
const {getItems, insertItem} = require('../db/db');

const schema = buildSchema(`
  type Items {
    id: ID
    name: String
    description: String
  }
  type GetOne {
    id: ID
  }
  type Query {
    getCrud: [Items],
    getOne(id: ID!): [GetOne]
  }


  input Create {
    name: String
    description: String
  }
  type Mutation {
    createItem(input: Create): Items
  }
`);
const root = {
  getCrud: () => getItems('crud').then(data => {return data}),
  getOne: ({id}) => getItems('crud', id).then(data => {return data}),
  createItem: ({input}) => insertItem('crud', input).then(data => {return data})
};

module.exports = {schema, root}
