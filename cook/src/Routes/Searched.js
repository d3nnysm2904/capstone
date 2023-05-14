import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Searched.css';

function Searched ()
{
    const [ search, setSearch ] = useState( [] );
    let params = useParams();

    const getSearched = async ( name ) =>
    {

        const apiKey = '245b95bd19f0434987967393dba74607';

        const data = await fetch( `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ apiKey }&query=${ name }` );

        const recipes = await data.json();

        setSearch( recipes.results );


    };

    useEffect( () =>
    {
        getSearched( params.search );
    }, [ params.search ] );



    return (
        <div className="Grid">


            { search.map( i =>
            {
                return (
                    <Link to={ '/recipe/' + i.id } >
                        <div key={ i.id } className="Card" >
                            <h4>{ i.title }</h4>
                            <img src={ i.image } alt="" />
                        </div> </Link> );
            } ) }

        </div>
    );
}

export default Searched;