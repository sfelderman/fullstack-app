# fullstack-app

## Running

`docker-compose up --build` to run

## TODO Rewrite

- Move REST work to /rest URL
- setup graphql within the server
  - frontend then use apollo client and get all the caching layers and stuff out of the box

### Sections

- todos
- finances
- calendar (with the special api to instant adding)
- reddit?
- popular news sites?

### Architecture

- replaceable layer between resolver and actual implementation

## Setup

- ESLINT setup
- Prettier setup
- Typescript setup
- homescreen with routing
- Login / register
  - passport
  - jwt, bycrypt
  - validators
- hookup to plaid
- pull transactions
- save transactions

- ### TODO enhancements
  - Due dates
  - Push notifications
    - upcoming due date
    - notification on a date

## Deployment

- deploy the front and backend on a server somewhere
- doesn't have to be big

# Rewrite

## ~~Create login~~

## Create homepage

- create `/todos` as current TODO app

## Remove Optimistic UI Layer

- remove OUI, enable persistence and offline
- or replace with apollo client

# Finances

## Structure

- users (C)
  - institutions (C)
    - accessToken
    - itemId
    - institutionId
    - institutionName
  - transactions (C)
    - id
    - date
    - name
    - merchantName
    - institutionId
    - institutionName
    - category
    - pending
    - amount
  - ~~Categories (C)~~
    - ~~Name~~
  - meta: (M)
    - total (updated with each added transaction)
  - settings: (M)

### Storage

- background poll - sync data every X minutes/hours
  - basically keep a running total as things continue
- update different buckets
  - \# of transactions
  - total cost
  - categories
- time periods buckets
  - day
  - week
  - month
  - year (by month)
  - yearly

## Authentication

## Hosting

## Checklist things done

- ### :white_check_mark: Basic Rest
- ### :white_check_mark: Basic Docker
- ### :white_check_mark: Basic Database
- ### :white_check_mark: Incredibly Basic Frontend
- ### :white_check_mark: Set up Prettier
- ### :white_check_mark: Basic Viewing of mocked TODOS
- ### :white_check_mark: Hookup viewing live TODOs
- ### :white_check_mark: Hookup editing live TODOs

- ### :white_check_mark: Basic Optimistic UI Layer

  - Should respond immediately with success state
  - Should update any necessary info after success (\_id would need an update)

---

# OLD STUFF

## Checklist things TODO

- ### Advanced Optimistic UI Layer

  - Should report when an error occurs and roll back all changes
  - how to preserve the data?
  - allow throttling if needed
    - collect all updates and send last state after X time
    - Example: toggling the completed state

- ### Error Handling

  - report errors in console for all request
  - consider a _Use Fetch hook_ to standardize this

- ### ServiceWorkers

  - intercept outgoing data and store it in cache or indexDB
  - Update cache/db after response
  - Full offline support?

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
