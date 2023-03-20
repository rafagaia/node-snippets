const express = require('express');
const { buildSchema } = require('graphql');
const {  } = require('graphql-http');


const schema = buildSchema(`
    type Query {
        description: String
        price: FLoat
    }
`);


const app = express();

app.listen(3000, () => {
    console.log("Running GraphQL server...");
});