const db = require( "../db" );

class User
{
    static async getAll ()
    {
        const results = await db.query( `SELECT id,  first_name,password, last_name,email FROM users` );
        return results.rows;

    }
}

module.exports = User;