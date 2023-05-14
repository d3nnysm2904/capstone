import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Recipe.css';

function Recipe ()
{
    let params = useParams();
    const [ info, setInfo ] = useState( {} );
    const [ active, setActive ] = useState( ( 'instruccions' ) );

    const fetchDetails = async () =>
    {



        const apiKey = '245b95bd19f0434987967393dba74607';
        const api = await fetch( `https://api.spoonacular.com/recipes/${ params.name }/information?apiKey=${ apiKey }` );
        const data = await api.json();
        setInfo( data );
    };

    useEffect( () =>
    {
        fetchDetails();
    }, [ params.name ] );


    return (
        <div className="Recipes">

            <h2>{ info.title }</h2>
            <img src={ info.image } alt={ info.title } />

            <div className='Info' >
                <button
                    className={ active === 'instruccions' ? 'actives' : 'notActive' }
                    onClick={
                        () =>
                            setActive( 'instruccions' ) } >
                    Instruccions
                </button>
                <button
                    className={ active === 'ingredients' ? 'actives' : '' }
                    onClick={
                        () =>
                            setActive( 'ingredients' ) } >
                    Ingredients</button>
                { active === "instruccions" && <><h3 dangerouslySetInnerHTML={ { __html: info.summary } } ></h3>
                    <h3 dangerouslySetInnerHTML={ { __html: info.instructions } } ></h3></> }

                { active === "ingredients" && <> <ul>
                    { info.extendedIngredients.map( ( i ) => ( <li key={ i.id } > { i.original }</li> ) ) }
                </ul></> }


            </div>


        </div>
    );
}



export default Recipe;