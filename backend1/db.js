// const { Client } = require( "pg" );

// let DB_URI;

// // If we're running in test "mode", use our test db
// // Make sure to create both databases!;
// if ( process.env.NODE_ENV === "test" )
// {
//     DB_URI = "postgresql://test_iser:mypassword@localhost/cookdb";
// } else
// {
//     DB_URI = "postgresql://test_iser:mypassword@localhost/cookdb";
// }

// let db = new Client( {
//     connectionString: DB_URI
// } );

// db.connect();

// module.exports = db;

"use strict";
/** Database setup for jobly. */
const { Client } = require( "pg" );
const { getDatabaseUri } = require( "./config" );

let db;

if ( process.env.NODE_ENV === "production" )
{
    db = new Client( {
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    } );
} else
{
    db = new Client( {
        connectionString: getDatabaseUri()
    } );
}

db.connect();

module.exports = db;