/** Routes for users of pg-intro-demo. */
// process.env.NODE_ENV = "test";
const express = require( "express" );
const ExpressError = require( "../expressError" );
const router = express.Router();
const db = require( "../db" );
const User = require( "../models/user" );

router.get( '/', async ( req, res, next ) =>
{
    try
    {
        const user = await User.getAll();
        return res.json( user );
    } catch ( e )
    {
        return next( e );
    }
} );
router.get( '/:id', async ( req, res, next ) =>
{
    try
    {
        const { id } = req.params;
        const results = await db.query( 'SELECT * FROM users WHERE id = $1', [ id ] );
        if ( results.rows.length === 0 )
        {
            throw new ExpressError( `Can't find user with id of ${ id }`, 404 );
        }
        return res.send( { user: results.rows[ 0 ] } );
    } catch ( e )
    {
        return next( e );
    }
} );

router.get( '/recipes/:id', async ( req, res, next ) =>
{
    try
    {
        const { id } = req.params;

        const results = await db.query( 'SELECT  username_id, recipe_id FROM user_recipes WHERE id = $1', [ id ] );
        if ( results.rows.length === 0 )
        {
            throw new ExpressError( `Can't find user with id of ${ id }`, 404 );
        }
        return res.send( { recipes: results.rows[ 0 ] } );
    } catch ( e )
    {
        return next( e );
    }
} );

router.post( '/', async ( req, res, next ) =>
{
    try
    {
        const { username, password, first_name, last_name, email } = req.body;
        const results = await db.query( 'INSERT INTO users (username, password,first_name,last_name,email) VALUES ($1, $2, $3, $4,$5) RETURNING username, password, first_name,last_name,email', [ username, password, first_name, last_name, email ] );
        return res.status( 201 ).json( { user: results.rows[ 0 ] } );
    } catch ( e )
    {
        return next( e );
    }
} );

router.patch( '/:id', async ( req, res, next ) =>
{
    try
    {
        const { id } = req.params;
        const { username, password, first_name, last_name, email } = req.body;
        const results = await db.query( 'UPDATE users SET username=$1, password=$2, first_name=3$, last_name=$4, email=$5 WHERE id=$6 RETURNING id, name, type', [ username, password, first_name, last_name, email, id ] );
        if ( results.rows.length === 0 )
        {
            throw new ExpressError( `Can't update user with id of ${ id }`, 404 );
        }
        return res.send( { user: results.rows[ 0 ] } );
    } catch ( e )
    {
        return next( e );
    }
} );

router.delete( '/:id', async ( req, res, next ) =>
{
    try
    {
        const { id } = req.params;
        const results = db.query( 'DELETE FROM users WHERE id = $1', [ id ] );
        return res.send( { msg: "DELETED!" } );
    } catch ( e )
    {
        return next( e );
    }
} );


module.exports = router;