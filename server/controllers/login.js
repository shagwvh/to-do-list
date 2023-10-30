const { checkUserExists, insertNewUser } = require("../connections/loginDb");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config= require('../config');

exports.requestToLogin = (req, res, next) => {
    // data
    const userName = req.body.userName;
    const password = req.body.password;

    console.log(userName,password, 'login data')
    // process request
    return exports.processLogin(userName, password)
        .then((response) => {
            console.log(response, 'response after login successfully')
            if (response.message == 'success') {
                // setting the auth token in the header
                res.set({
                    Authorization: response.authToken,
                    'Access-Control-Expose-Headers': 'Authorization',
                });
                res.status(200);
                const finalResponse = {
                    message: 'success',
                    email: response.data.email,
                    name: response.data.name,
                    authToken: response.authToken,
                    refreshToken:response.refreshToken
                };
                res.json(finalResponse);
            } else {
                // invalidate the auth
                res.status(401);
                const finalResponse = {
                    message: 'error',
                    errorMessage:response.errorMessage,
                };
                res.json(finalResponse);
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(400);
            res.json({
                message: 'error',
                errorMessage:'Something Went Wrong'
            });
        });
};

exports.processLogin = (userName, password) => {
    console.log(userName,password, 'processLogin')
    return checkUserExists(userName)
        .then(async ([ result ]) => {
            if (result.length) {
                console.log(result, 'login user data ')
                // fetching user data
                const data = result[0];
                // Check the password
                const passwordMatch = await bcrypt.compare(password, data.password);
                if (!passwordMatch) {
                    return {
                        errorMessage:'Invalid Credentails',
                        message:'error'
                    };
                }
                console.log('password matched')
                const authToken = jwt.sign({ id: data.userId }, config.token.tokenSecretKey, { expiresIn: '24h' });
                const refreshToken = jwt.sign({ id: data.userId }, config.token.refreshTokenSecretKey, { expiresIn: '7d' });
                console.log(authToken);
                return {
                    authToken,
                    refreshToken,
                    data,
                    message:'success'
                };
            } else {
                return {
                    errorMessage:'Invalid Credentails',
                    message:'error'
                };
            }
        })
        .catch((err) => {
            console.error(err);
            throw err; // Rethrow the error to maintain consistency
        });
};

exports.requestToSignUpUser = async (req, res) => {
  try {
    // Extracting user signup data from the request body
    const { userName, email, password, name } = req.body;

    // Validating input data
    if (!userName || !email || !password || !name) {
      return res.status(400).json({ message: 'Invalid Data!' });
    }

    // Checking if the username already exists
    const [existingUser] = await checkUserExists(userName);

    if (existingUser.length) {
      // If username already exists, send a response
      return res.status(201).json({ message: 'User name already exists' });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserting a new user into the database
    await insertNewUser(userName, email, hashedPassword, name);

    // Sending a success response for user creation
    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
