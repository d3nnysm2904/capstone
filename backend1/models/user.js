const db = require( "../db" );
const ExpressError = require( "../expressError" );
const bcrypt = require( 'bcrypt' );
const { BCRYPT_WORK_FACTOR } = require( '../config' )

class User
{
    static async getAll ()
    {
        try
        {
            const results = await db.query( `SELECT id,username,  first_name,password, last_name,email FROM users` );
            return results.rows;
        } catch ( e )
        {
            return next( e );
        }


    }

    static async getById ( id )
    {

        const results = await db.query( `SELECT id ,first_name, last_name, email FROM users WHERE id=$1`, [ id ] );
        if ( results.rows.length === 0 )
        {
            throw new ExpressError( "User Not Found", 404 );
        }

        return results.rows[ 0 ];


    }

    static async getRecipes ( id )
    {
        const results = await db.query( 'SELECT  username_id, recipe_id FROM user_recipes WHERE id = $1', [ id ] );
        if ( results.rows.length === 0 )
        {
            throw new ExpressError( `Can't find user with id of ${ id }`, 404 );
        }
    }

    // static async login ( username, password )
    // {
    //     const result = await db.query( `SELECT username, password FROM users WHERE username=$1 `, [ username, password ] );
    //     const user = result.rows[ 0 ];

    //     if ( user )
    //     {
    //         if ( await bcrypt.compare( password, user.password ) )
    //             return `Logged in ${ username }`;
    //     } return new ExpressError( `Invalid username/password` );



    // }

    static async create (
        username,
        password,
        first_name,
        last_name,
        email )
    {


        const hashpwd = await bcrypt.hash( password, BCRYPT_WORK_FACTOR );

        const results = await db.query( 'INSERT INTO users (username, password, first_name, last_name,email) VALUES ($1, $2, $3, $4, $5) RETURNING username, password, first_name,last_name,email', [ username, hashpwd, first_name, last_name, email ] );

        return results.rows[ 0 ];
    }

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

}

module.exports = User;
