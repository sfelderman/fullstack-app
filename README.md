# fullstack-app

## Running

`docker-compose up --build` to run

## Checklist of things done

- ### :white_check_mark: Basic Rest
- ### :white_check_mark: Basic Docker
- ### :white_check_mark: Basic Database
- ### :white_check_mark: Incredibly Basic Frontend
- ### :white_check_mark: Set up Prettier
- ### :white_check_mark: Basic Viewing of mocked TODOS
- ### :white_check_mark: Hookup viewing live TODOs
- ### :white_check_mark: Hookup editing live TODOs

- ### Basic Optimistic UI Layer

  - Should respond immediately with success state
  - Should update any necessary info after success (\_id would need an update)
  - Should report when an error occurs and roll back all changes
    - how to preserve the data?

- ### Error Handling

  - report errors in console for all request
  - consider a _Use Fetch hook_ to standardize this

- ### ServiceWorkers

  - intercept outgoing data and store it in cache or indexDB
  - Update cache/db after response
  - Full offline support?

- ### ESLINT setup

  - Get it integrated and working with prettier

- ### Progressive Web App

  - mobile friendly
  - service workers install on phone

- ## Testing

- mocked unit tests
- ui tests - Perhaps look into some type of testing framework for hitting the mocked endpoints like cypress
- storybook?

- ### Investigate Mocking for "Local" development

  - look into the DFP in a box
  - fillable database
  - proxy to watch incoming and out going traffic
  - how to put the server code and small dataset inside of the container

- ### TODO enhancements
  - Due dates
  - Push notifications
    - upcoming due date
    - notification on a date

## Deployment

- deploy the front and backend on a server somewhere
- doesn't have to be big

### Authentication
