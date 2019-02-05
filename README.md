## Bartender

This web application is developed using React JS for frontend and Express on the backend. It is using Sequelize ORM and a MySQL database.

## To run the application locally:

# Node/Express Backend

1. Download the repo
2. On your terminal, run `npm install`
3. create a local MySQL database
4. create a `.env` file in the root folder and put in the following information for your local MySQL database:
   `MYSQL_USER=`
   `MYSQL_KEY=`
   `MYSQL_DBNAME=`
   `MYSQL_HOST=127.0.0.1`
5. On your terminal, run `export bartender_jwtPrivateKey=` to set a secret key for the JSON web token
6. Run `node index.js` to launch the Node backend
7. If everything is configured correctly, the tables should be created for the local MySQL database and you can populate it with appropriate data

# React JS Frontend

1. On your terminal, run `cd client` and `npm install`
2. Put your localhost url in `.env.development` file
3. On your terminal, run `npm start`
4. If everthing is configured correctly, the site will launch on your default browser

## Deploy to heroku:

1. On your terminal, log in to Heroku using `heroku login`
2. Create a project using `heroku create`
3. Go to your Heroku dashboard -> Add-On -> Search for `JawsDB` (for MySQL)
4. On your application folder, go to `client` and put your `heroku app URL` in `.env.production`
5. On your terminal, set the environment variables for Heroku:
   a. `heroku config:set bartender_jwtPrivateKey=`
   b. `heroku config:set NODE_ENV=production`
6. push your project to heroku using `git push heroku master`
7. If everything works well, your project is now on heroku, go to the `heroku app URL` to see it.

# NOTE: you will need to repopulate the JawsDB with data, visit the JawsDB on your Heroku dashboard for database credentials

# NOTE: for any issues with the app, on your terminal, `heroku logs --tail` to see the details
