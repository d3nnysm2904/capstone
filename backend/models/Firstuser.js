const db = require( "../db" );
const ExpressError = require( "../expressError" );
const bcrypt = require( 'bcrypt' );
const { BCRYPT_WORK_FACTOR } = require( '../config' );

class User
{

    static async getUsername ( username )
    {

        const results = await db.query( `SELECT username ,first_name, last_name, email FROM users WHERE username=$1`, [ username ] );
        if ( results.rows.length === 0 )
        {
            throw new ExpressError( "User Not Found", 404 );
        }

        return results.rows[ 0 ];


    }

    // static async getRecipes ( id )
    // {
    //     const results = await db.query( 'SELECT  username_id, recipe_id FROM user_recipes WHERE id = $1', [ id ] );
    //     if ( results.rows.length === 0 )
    //     {
    //         throw new ExpressError( `Can't find user with id of ${ id }`, 404 );
    //     }

    //     return results.rows[ 0 ];
    // }



    static async patch (
        username,
        password,
        first_name,
        last_name,
        email,
        id )
    {
        if ( !username || !password || !first_name || !last_name || !email )
        {
            throw new ExpressError( "Missing require data", 400 );
        }
        const results = await db.query( 'UPDATE users SET username=$1, password=$2, first_name=$3, last_name=$4, email=$5 WHERE id=$6 RETURNING id, username,first_name, last_name,email', [ username, password, first_name, last_name, email, id ] );

        return results.rows[ 0 ];
    }

    static async delete ( id )
    {
        const results = await db.query( 'DELETE FROM users WHERE id = $1 RETURNING id ', [ id ] );
        if ( results.rows.length === 0 )
        {
            throw new ExpressError( "User not Found", 404 );
        }

    }

    static async login ( username, password )
    {
        const result = await db.query( `SELECT username, password FROM users WHERE username=$1`, [ username ] );

        const user = result.rows[ 0 ];

        if ( user )
        {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare( password, user.password );
            if ( isValid === true )
            {
                delete user.password;
                return user;
            }
        }

        throw new ExpressError( "Invalid username/password", 400 );
    }

    static async register (
        { username, password, first_name, last_name, email } )
    {
        const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
            [ username ],
        );

        if ( duplicateCheck.rows[ 0 ] )
        {
            throw new ExpressError( `Duplicate username: ${ username }` );
        }

        const hashedPassword = await bcrypt.hash( password, BCRYPT_WORK_FACTOR );

        const result = await db.query(
            `INSERT INTO users
             (username,
              password,
              first_name,
              last_name,
              email)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING username, first_name, last_name , "email"`,
            [
                username,
                hashedPassword,
                first_name,
                last_name,
                email,

            ],
        );

        const user = result.rows[ 0 ];

        return user;
    }


}

module.exports = User;
