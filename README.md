# fullstack-app

## Running

`docker-compose up --build` to run

## Checklist of things done

- #### [x] Basic Rest

  - Simple rest service with a couple basic endpoints CRUD. For the moment this is a todo

  - Endpoints?

- #### [x] Basic Docker

  - Simple docker container that can host the server and which requests can be made against

- #### [x] Basic Database

  - Store some data that is slightly more complicated than what was initially created by the rest endpoints.

  - Endpoints now call against the database instead of against local data.

- #### [x] Incredibly Basic Frontend

  - Working create react app

- #### [x] Set up Prettier

  - Basic prettier implementation.

- #### [ ] Basic Viewing of mocked TODOS

  - view some TODOs in the app

- #### [ ] Hookup viewing live TODOs

  - The get endpoints

- #### [ ] Hookup editing live TODOs

  - all the endpoints

- #### [ ] Testing

  - basic testing coverage
  - can be expanded upon later

## Testing

- component library?
- storybook?
- mocked data ui tests

### Investigate Mocking for "Local" development

Perhaps look into some type of testing framework for hitting the mocked endpoints like cypress (or look into the DFP in a box :) )

## Progressive Web App

- mobile friendly
- service workers and offline support
  - might be something cool to look into for testing

## To Be Continued

- Proxying of request to create local data store
- Act as middleware for local tests
