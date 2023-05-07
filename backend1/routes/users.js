/** Routes for users of pg-intro-demo. */
// process.env.NODE_ENV = "test";
const express = require( "express" );
const ExpressError = require( "../expressError" );
const router = express.Router();
const db = require( "../db" );
const User = require( "../models/user" );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const { SECRET_KEY } = require( '../config' )
// const User1 = require( "../models/user1" );


// GEt all userss 
router.get( '/', async ( req, res, next ) =>
{
    try
    {
        const users = await User.getAll();
        return res.json( users );
    } catch ( e )
    {
        return next( e );
    }
} );


// Get users by id 
router.get( '/:id', async ( req, res, next ) =>
{
    try
    {
        const { id } = req.params;
        const user = await User.getById( id );
        return res.json( user );
    } catch ( e )
    {
        return next( e );
    }
} );

// Get recipe by id 
router.get( '/recipes/:id', async ( req, res, next ) =>
{
    try
    {
        const { id } = req.params;
        const user = await User.getRecipes( id );
        return res.json( user );
    } catch ( e )
    {
        return next( e );
    }
} );

// register a new user 
router.post( '/register', async ( req, res, next ) =>
{
    try
    {
        const {
            username,
            password,
            first_name,
            last_name,
            email } = req.body;



        if ( !username || !password || !first_name || !last_name || !email )
        {
            throw new ExpressError( "Misising data", 400 );
        }

        const user = await User.create( username, password, first_name, last_name, email );
        return res.json( user ) 
    } catch ( e )
    {   
        if ( e.code === '23505' )
        {
            return next( new ExpressError( "Username taken ,Please pick another ", 400 ) );
        }
        return next( e );
    }
} );

router.post( '/login', async ( req, res, next ) =>
{
    try
    {

        const {
            username,
            password,
        } = req.body;

        if ( !username || !password )
        {
            throw new ExpressError( "Missing username or password ", 400 );
        }

        const result = await db.query( `SELECT username, password FROM users WHERE username=$1 `, [ username ] );
        const user = result.rows[ 0 ];

        if ( user )
        {
            if ( await bcrypt.compare( password, user.password ) )
            {
                const token = jwt.sign( { username }, SECRET_KEY );
                return res.json( { message: 'Logged in', token } );
            }
        }
        throw new ExpressError( 'Invalid username/password ', 400 );


    } catch ( e )
    {
        return next( e );
    }
} );
router.get( '/top', async ( req, res, next ) =>
{
    try
    {
        const token = req.body._token;

        const data = jwt.verify( token, SECRET_KEY );
        return res.json( { msg: "signed in top secret" } );


    } catch ( e )
    {
        return next( new ExpressError( 'Please login first' ), 401 );
    }
} );

// Update a user 
router.put( '/:id', async ( req, res, next ) =>
{
    try
    {
        const { id } = req.params;
        const { username, password, first_name, last_name, email } = req.body;
        const user = await User.patch( username, password, first_name, last_name, email, id );

        return res.json( user );
    } catch ( e )
    {
        return next( e );
    }
} );

// Delete a user 
router.delete( '/:id', async ( req, res, next ) =>
{
    try
    {
        const { id } = req.params;
        const user = await User.delete( id );

        return res.json( { msg: 'Deleted' } )


    } catch ( e )
    {
        return next( e );
    }
} );





module.exports = router;