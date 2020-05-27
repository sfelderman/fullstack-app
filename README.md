# db-in-a-box

An offline wrapper for a database like what DFP in a box would have been. Potentially provide way to fill it with data by proxying requests, persistence of data, and can be reset to base after each "run".

## running

`docker-compose up --build` to run

### Basic Rest :white_check_mark:

Simple rest service with a couple basic endpoints CRUD

Simple express server that containers these endpoints and will respond to requests

### Basic Docker :white_check_mark:

Simple docker container that can host the server and which requests can be made against

### Basic Database :white_check_mark:

Store some data that is slightly more complicated than what was initially created by the rest endpoints. Endpoints now call against the database instead of against local data.

### Dockerize Server and Database

Create a running instance with containers for both the server and the database.

### Investigate Mocking for "Local" development

Investigate or Implement basic mocking for endpoints. Maybe use a library.

## To Be Continued
- Proxying of request to create local data store
- Act as middleware for local tests