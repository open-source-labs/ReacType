
const { gql } = require('apollo-server-express');


const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }
  type Author {
    name: String
    books: [Book]
  }
  type Mutation {
    addTest(name: String): Test
    updateTest(id: String, name: String): Test
    deleteTest(id: String): Test
  }
  type Test {
    description: String
  }
  type Query {
    readTest(id: String): Test
    readAllTests: [Test]
  }
`;

module.exports = {
  typeDefs,
};
