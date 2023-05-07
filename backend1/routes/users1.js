const express = require( "express" );

const router = express.Router();

const User = require( "../models/user1" );


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

router.post( '/', async ( req, res, next ) =>
{
    try
    {
        const { username, password, first_name, last_name, email } = req.body;
        const user = await User.create( username, password, first_name, last_name, email );
        return res.json( user );
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
        const user = await User.getById( id );
        user.username = req.body.username;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        await user.update();
        return res.json( user );




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
        const user = await User.getById( id );
        await user.delete();

        return res.json( { msg: 'Deleted' } );


    } catch ( e )
    {
        return next( e );
    }
} );


module.exports = router;