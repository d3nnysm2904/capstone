const db = require( "../db" );
const ExpressError = require( "../expressError" );
const { BCRYPT_WORK_FACTOR } = require( '../config' );

class User
{
    constructor (
        id,
        username,
        password,
        first_name,
        last_name,
        email,
        recipe_id )
    {
        this.id = id;
        this.username = username,
            this.password = password,
            this.first_name = first_name,
            this.last_name = last_name,
            this.email = email;
        this.recipe_id = recipe_id;
    }
    static async getAll ()
    {
        const result = await db.query( `SELECT id,username, password, first_name, last_name, email FROM users` );

        const user = result.rows.map( r => new User( r.id, r.username, r.password, r.first_name, r.last_name, r.email ) );
        console.log( user );
        return user;
    }

    static async getById ( id )
    {
        const results = await db.query(
            `SELECT id,
             username,
              password,
             first_name,
             last_name,
             email FROM users WHERE id=$1`, [ id ] );

        const u = results.rows[ 0 ];
        if ( !u )
        {
            throw new ExpressError( 'User not found', 404 );
        }
        return new User(
            u.id,
            u.username,
            u.first_name,
            u.last_name,
            u.email );
    }

    static async getRecipes ( id )
    {
        const results = await db.query( 'SELECT  username_id, recipe_id FROM user_recipes WHERE id = $1 ', [ id ] );

        const r = results.rows[ 0 ];
        if ( !r )
        {
            throw new ExpressError( 'No recipe found ', 404 );

        }
        return new User(
            r.id,
            r.username,
            r.first_name,
            r.last_name,
            r.email,
            r.recipe_id
        );
    }

    static async create (
        newUsername,
        newPassword,
        newFirst_name,
        newLast_name,
        newEmail )
    {
        const result = await db.query( `INSERT INTO users
(username,
 password,
 first_name,
 last_name,
 email)
 VALUES
 ($1,$2,$3,$4,$5) RETURNING username,first_name,last_name,email`, [
            newUsername,
            newPassword,
            newFirst_name,
            newLast_name,
            newEmail ] );

        if ( !newUsername || !newPassword || !newFirst_name || !newLast_name || !newEmail )
        {
            throw new ExpressError( 'Misising data', 400 );
        }
        const { username, password, first_name, last_name, email } = result.rows[ 0 ];

        return new User( username, password, first_name, last_name, email );
    }

    async delete ()
    {
        const results = await db.query( `DELETE from users WHERE id=$1`, [ this.id ] );
    }

    async update ()
    {
        const results = await db.query( `UPDATE users 
        SET 
        username=$1,
         first_name=$2
         ,last_name=$3
         ,email=$4 WHERE id =$5` , [ this.username, this.first_name, this.last_name, this.email, this.id ] );
    }

}

module.exports = User;