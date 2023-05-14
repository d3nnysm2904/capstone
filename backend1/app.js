"use strict";

/** Express app for jobly. */

const express = require( "express" );
const cors = require( "cors" );
const { NotFoundError } = require( "./expressError" );
const { authenticateJWT } = require( "./middleware/auth" );
const authRoutes = require( "./routes/auth" );
const usersRoutes = require( "./routes/user" );


const morgan = require( "morgan" );

const app = express();

app.use( cors() );
app.use( express.json() );
app.use( morgan( "tiny" ) );
app.use( authenticateJWT );

app.use( "/auth", authRoutes );
app.use( "/users", usersRoutes );



/** Handle 404 errors -- this matches everything */
app.use( function ( req, res, next )
{
    return next( new NotFoundError() );
} );

/** Generic error handler; anything unhandled goes here. */
app.use( function ( err, req, res, next )
{
    if ( process.env.NODE_ENV !== "test" ) console.error( err.stack );
    const status = err.status || 500;
    const message = err.message;

    return res.status( status ).json( {
        error: { message, status },
    } );
} );

module.exports = app;










// "use strict";

// const express = require( "express" );
// const cors = require( "cors" );
// const app = express();
// const ExpressError = require( "./expressError" );
// const { authenticateJWT } = require( './middleware/auth' );
// const uRoutes = require( "./routes/users" );


// const morgan = require( "morgan" );
// app.use( cors() );
// app.use( morgan( "tiny" ) );
// app.use( express.json() );
// app.use( authenticateJWT );
// app.use( "/users", uRoutes );


// /** 404 handler */

// app.use( function ( req, res, next )
// {
//     const err = new ExpressError( "Not Found", 404 );

//     // pass err to the next middleware
//     return next( err );
// } );

// /** general error handler */

// app.use( function ( err, req, res, next )
// {
//     // the default status is 500 Internal Server Error
//     let status = err.status || 500;

//     // set the status and alert the user
//     return res.status( status ).json( {
//         error: {
//             message: err.message,
//             status: status
//         }
//     } );
// } );

// module.exports = app; 