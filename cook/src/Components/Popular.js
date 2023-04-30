import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './Popular.css';
import { Link } from 'react-router-dom';
function Popular ()
{

    const [ popular, setPopular ] = useState( [] );


    useEffect( () =>
    { getPopular(); }, [] );


    const getPopular = async () =>
    {

        const check = localStorage.getItem( 'popular' );

        if ( check )
        {
            setPopular( JSON.parse( check ) );
        } else
        {
            const apiKey = '245b95bd19f0434987967393dba74607';
            const api = await fetch( `https://api.spoonacular.com/recipes/random?apiKey=${ apiKey }&number=9` );
            const data = await api.json();
            localStorage.setItem( 'popular', JSON.stringify( data.recipes ) );
            console.log( data );
            setPopular( data.recipes );
        }

    };
    return (
        <div>
            <div className="Wrapper">
                <h3>Popular picks </h3>
                <Splide options={ {
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem'
                } }>
                    { popular.map( r =>
                    {
                        return (
                            <SplideSlide key={ r.id }>

                                <Link to={ 'recipe/' + r.id } >  <div key={ r.id } className="Card" >
                                    <p className='title' >{ r.title }</p>
                                    <img className='img' src={ r.image } alt={ r.title } />

                                </div>
                                </Link>
                            </SplideSlide>


                        );

                    } ) }
                </Splide>
            </div>


        </div>

    );
}




export default Popular;