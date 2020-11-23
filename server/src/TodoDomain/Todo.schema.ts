import { gql } from 'apollo-server-express';

const sharedTodoInputArgs = `
text: String,
dueDate: Date
`;

const TodoDomain = gql`
  type TodoDomain {
    todo(id: ID!): Todo
    todos: [Todo]
  }

  type Todo {
    id: ID!
    userId: ID!
    title: String!
    text: String!
    completed: Boolean!
    dueDate: Date
  }

  type Mutation {
    createTodo(
      title: String!,
      completed: Boolean = false,
      ${sharedTodoInputArgs}
    ): Todo

    updateTodo(
      id: ID!,
      title: String,
      completed: Boolean,
      ${sharedTodoInputArgs}
      ): Todo

    deleteTodo(id: ID!): Todo
  }
`;

export default TodoDomain;
