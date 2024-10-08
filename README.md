# Judiciary Information System Software

## Note:
I deleted my data cluster and my credentials won't work anymore. Please create a cluster following instructions from the [database configuration step](#how-to-configure-your-own-database)

## Links:

1. [Authors](#authors)
2. [How to run](#how-to-run)
3. [How to configure your own database](#how-to-configure-your-own-database)
4. [How to create your own models](#how-to-create-your-own-models)
5. [Project structure](#project-structure)
6. [Further improvements](#further-improvements)
7. [Lama Dev's tutorial for MERN stack development](https://www.youtube.com/watch?v=ldGl6L4Vktk&t=0s)
 
## Authors: [Surya Prakash](https://github.com/nespar7/), [Virinchi Mourya](https://github.com/Kreiger444) and [Pandiri Adithya](https://github.com/fartbox123)

## How to run:
* Clone the project to somewhere on you local. Let's call it `local-folder`
* Open the terminal in `local-folder/api` and run the command: `nodemon`
* Open another terminal in `local-folder/client` and run the following commands: `npm install`, `npm run start`. This should open the login page.
* Login using the administrator credits you set up in the [database configuration step](#how-to-configure-your-own-database).
* Create users and test all functionalities.

## How to configure your own database:
* Create an account in MongoDB Atlas and create a project.
* Create a database using the free plan.
* After creating, you would be asked to create your first user. Set up username and password.
* Click on the connect button shown next to your cluster name and then choose the `Drivers` option.
* You will see an instruction saying `connection string` and a string in this format `mongodb+srv://<username>:<password>@cluster0.eurdb3t.mongodb.net/?retryWrites=true&w=majority`. Add your username and password and copy the string.
* Make sure to add your ip address in the accepted address list. set it to accept 0.0.0.0/0 to accept from all addeesses.
* Paste it in place of the similar string in the environment folder(`local-folder/api/.env`)
* Create case and user models.

## How to create your own models:
* In MongoDb atlas webstie, open your cluster.
* Open the collections tab.
* Create a database with name `test`.
* Click on the create collection button next to database name.
* Create the cases collection
* Create the users collection and add some data like this
  * username: registrar_1
  * password: $2a$07$tA6M.LX09GxDmqzUhavVeezO1PxwI9DFD2ovUeZS5uLeJiozi0aCK (In the website it is 123456, but due to encryptions while adding and validating users we add this hashed string as password while creation of the first user).
  * designation: registrar
* Open the website on your local with this registrar and you can now create users with different designations and add cases.

## Project Structure:

### [Backend](./api):

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


### [Frontend](./client)

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
* Add error messages when creation and login fails.
* Change fields like lawyer's name, etc. to selectors since they can not be something not in the database.
