# CSE264 Project 4: User Authenication for Project 3 Blackjack Game
## Due: Thursday, December 5, 2019 at 11:59 PM

In this assignment, you will use create a user authenication and account system for the blackjack game you created in project 3.

All the code and packages you need is in this GitHub Classroom repo. Do not install any other packages (unless given permission by the instructor). Take the code you developed in Project 3 as a starting place and build on top of it.

### Sign up page
For URL path /signup, create a page that allows a user to create an account. They should enter a username (and ensure it is unique to any other user in the DB), and choose a password. The user should have to enter this password twice to ensure that it is the same each time. The user should then be able to hit the submit button, have their account created and saved on the Database, and be logged in. 

On account creation password should be Hashed and Salted. Use Mongoose to create a Schema for the user that collects
* username (must be unique)
* password (must be hash and salted - not plaintext)
* win (number that records the number of times the player won)
* losses (number of times the player lost)
* ties (number of times player tied)

After account creation, log user in and redirect to URL path '/' which should be the blackjack game. Start game as before.

### Game Page
There will be new information now placed on the user page. At the very top, list the logged in user's user name, along with the wins, losses, and ties score. At the top also provide a link for the user to logout.

As the player plays the game, record each win/lose/tie and save this in the Database. 

**note** If your game does not work from Programming Assignment 3, provide three button to add 1 to each of these values. You would have a "win" button, and "lose" button and a "tie" button. Save the new value to the Database each time. 

If a user is not logged in and tries to access this page (the game page at URL path "/"), redirect the user to the login page. 

### Logout
Logout should log the player out, delete the current session, and redirect the user to the "login page"

### Login Page
This page (URL path '/login') should allow a user to login to the game. There should be a field to enter a username and password. The web app should check this username and password and if found in the database, should log the user in and redirect to the main game page at '/'

If the password or username is incorrect, it should display a message stating so, and allow the user to try and log in again.

There should also be a button at the bottom to "Sign up" that will redirect the user to the Sign Up Page.

### Passport.js and Express Session
You will use the [Passport.js](http://www.passportjs.org/docs/) to help authenicate users and handle session state. You will use the ["local stratagy"](http://www.passportjs.org/packages/passport-local/) for Passport.js. A good tutorial on using Passport.js with Express and Mongoose can be found [here](https://www.sitepoint.com/local-authentication-using-passport-node-js/). You will also use [express-session](https://github.com/expressjs/session) to manage session state between client and server. For the purposes of this project, you can use the default store, which saves state on the server memory. In a real world setting you should never do this. 

**note** This tutoral does not salt/hash the password field. Use [bcrypt](https://www.npmjs.com/package/bcrypt) to do this. This [tutorial](http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt) has some good information on how to do this.



### Other considerations
* All the same ways of getting mongoDB, .env files, etc, from Programming Assignment 2 also hold for this project. Feel free to take the same code from Programming Assignment 2 here. 

### Install and Run
You must have node.js running on your machine. Once you have cloned this project you can run `npm install` to install all the packages for this project. Then running `npm run dev` will run the dev version of this code, which will run this project with nodemon. Nodemon auto-restarts the node server every time you make a change to a file. Very helpful when you are writing and testing code.



### Grading
* **20 Points** - Correct sign up of user accounts (checking passwords same, username is unique, etc)
* **10 Points** - Salt/Hash passwords
* **20 Points** - Correct record, store, and display win/lose/tie
* **20 Points** - Login works as expected
* **10 Points** - Logout works
* **10 Points** - unloggin user trying to access game gets redirected to login page
* **10 Points** - Code is well commented and easy to read/follow.

* If code doesn't run/compile you can get no more than a 65, although this score can be much lower. But please write comments and a README to explain what you were trying to do. 


