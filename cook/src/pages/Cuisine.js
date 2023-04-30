import React, { useState, useEffect } from 'react';
import './Cuisine.css';
import { Link, useParams } from 'react-router-dom';

function Cuisine ()
{
    const [ cuisine, setCuisine ] = useState( [] );
    let params = useParams();



    const getCuisine = async ( name ) =>
    {
        const apiKey = '245b95bd19f0434987967393dba74607';
        const data = await fetch( `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ apiKey }&cuisine=${ name }` );
        const recipes = await data.json();
        setCuisine( recipes.results );
        console.log( cuisine );
    };

    useEffect( () =>
    {
        getCuisine( params.type );
        console.log( params );
    }, [ params.type ] );

    return (
        <div className="Grid">


            { cuisine.map( i =>
            {
                return (
                    <Link to={ '/recipe/' + i.id } >
                        <div key={ i.id } className="Card" >
                            <h4>{ i.title }</h4>
                            <img src={ i.image } alt="" />
                        </div>
                    </Link> );

            } ) }

        </div>
    );
}

export default Cuisine;