/** Routes for users of pg-intro-demo. */
// process.env.NODE_ENV = "test";
const express = require( "express" );
const ExpressError = require( "../expressError" );
const router = express.Router();
const User = require( "../models/user" );
const { ensureLoggedIn } = require( '../middleware/auth' );
const jsonschema = require( 'jsonschema' );
const userRegisterSchema = require( '../schemas/userNew.json' );
const userLoginSchema = require( '../schemas/userAuth.json' );
const { createToken } = require( "./tokens" );

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


// Get users by username 
router.get( '/:username', async ( req, res, next ) =>
{
    try
    {
        const { username } = req.params;
        const user = await User.getUsername( username );
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

router.post( "/register", async function ( req, res, next )
{
    try
    {
        const validator = jsonschema.validate( req.body, userRegisterSchema );
        if ( !validator.valid )
        {
            const e = validator.errors.map( e => e.stack );
            throw new ExpressError( "Missing data", e, 404 );
        }

        const newUser = await User.register( { ...req.body } );
        const token = createToken( newUser );
        return res.status( 201 ).json( { token } );
    } catch ( err )
    {
        return next( err );
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

        const results = jsonschema.validate( req.body, userLoginSchema );

        if ( !results.valid )
        {
            let listOfErrors = results.errors.map( error => error.stack );
            let e = new ExpressError( listOfErrors, 400 );
            return next( e );

        }

        const user = await User.login( username, password );

        const token = createToken( user );

        return res.json( token );


    } catch ( e )
    {
        return next( e );
    }
} );


// Update a user 
router.patch( '/:username', async ( req, res, next ) =>
{
    try
    {
        const { username } = req.params;
        const { password, first_name, last_name, email } = req.body;
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

        return res.json( { msg: 'Deleted' } );


    } catch ( e )
    {
        return next( e );
    }
} );







module.exports = router;