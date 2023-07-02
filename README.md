# Judiciary Information System Software
## Authors: [Surya Prakash](https://github.com/nespar7/), [Virinchi Mourya](https://github.com/Kreiger444)

## [Backend](./api):

The `api` folder is for the backend part. 
We used `node.js` with `express` framework for processing requests.

It has 3 important parts:

* [Models](./api/models)

  This is the folder where you can define your database models to use in requests and responses.
In our case, we have [cases](./api/models/Case.js) and [users](./api/models/User.js).

* [Routes](./api/routes)

  This is the folder for route handling. 

  * [Authorization](./api/routes/auth.js)

    When a user wants to login or when a new user has to be created, we need authorization.

  * [Case handling](./api/routes/case.js)

    This file handles requests(get, put and post) for case models.

  * [User handling](./api/routes/user.js)

    This file handles put request for user update, and get request for user data.

* [Environment Variables](./api/.env)

  This file contains all environment information. In our case, we put the mongodb url.


## [Frontend](./client)

The `client` folder is for frontend. 
We used `react.js` for frontend.

The `public` folder is for Assets and index.html.

The `src` folder has the source files.

* [Api calls](./client/src/apiCalls.js)
  Currently, only the login call is implemented
* [Context API](./client/src/context)
  We used `context api` to store user and app context in the website so that refreshing or reopening does not prompt the user to login again and again.
* [Components](./client/src/components)

  * [Topbar](./client/src/components/topbar) is the navigation bar at the top for user options depending on user designations.
  * [Search](./client/src/components/searches) is the search functionality for the user to search for cases depending on names, dates, etc.
  * [Info](./client/src/components/info) shows the user information about cases involving them(All cases for a registrar).
  * [Case](./client/src/components/case) is a card style component to show case information
* [Pages](./client/src/pages)

  Pages like home, login, etc. for different functionalities.


## Further improvements

* Add a custom table component to show user and case information more efficiently.
* Implement the payment functionality so that a non-admin user can only access cases they have paid for.
