Instructions:

Dependencies: Git, Node, MongoDB, Browser

In order to run the project:
1. clone the repo (https://bitbucket.org/nicklathen/react-auth-interview.git).
2. $ npm install #(if you are having issues with gyp/bcrypt, try node v10.15.1)
3. $ mongod  #(mongodb -- point dbpath wherever)
4. $ node server.js  #(api server port 8080)
5. $ npm start  #(development server port 3000)
6. $ ./dev_scripts/createUser.sh  #(to create a user)
7. Go to http://localhost:3000.
8. Login using your credentials (user, password).
9. View the "Secret" link.

This starter repo is a simple react/express/mongo app with a single authenticated frontend route (/secret), which can only be access once logged in.

By default, the JWT used for authentication expires in 1 hour. Once expired, the app will prevent the user from navigating to the protected route, and they must manually log back in to get a new JWT.

Our goal is to implement "auto logout" functionality with the following specifications:

  1. Tokens should only be valid for 5 minutes.
  2. Once the user's token is invalid/expired, the user should be immediately re-routed back to login. They will need to manually log back in to get a new token.
  3. While the user has a valid token, activity by the user should extend the expiration date of the token. This means the token should not expire until there has been 5 minutes without activity from the user.
  4. The user should receive a warning 30 seconds prior to being logged out. Interaction with the warning should extend the expiration date of the token.






Originally forked from https://github.com/faizanv/react-auth-example
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of their guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).