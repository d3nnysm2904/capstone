import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './Veggie.css';



function Veggie ()
{

    const [ veggie, setVeggie ] = useState( [] );


    useEffect( () =>
    { getVeggie(); }, [] );


    const getVeggie = async () =>
    {

        const check = localStorage.getItem( 'Veggie' );

        if ( check )
        {
            setVeggie( JSON.parse( check ) );
        } else
        {
            const apiKey = '245b95bd19f0434987967393dba74607';
            const api = await fetch( `https://api.spoonacular.com/recipes/random?apiKey=${ apiKey }&number=9&tags=vegetarian` );
            const data = await api.json();
            localStorage.setItem( 'Veggie', JSON.stringify( data.recipes ) );
            console.log( data );
            setVeggie( data.recipes );
        }

    };
    return (
        <div>
            <div className="Wrapper">
                <h3>Vegetables picks </h3>
                <Splide options={ {
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem'
                } }>
                    { veggie.map( r =>
                    {
                        return (
                            <SplideSlide key={ r.id }>
                                <Link to={ '/recipe/' + r.id } > <div key={ r.id } className="Card" >
                                    <p className='title
                                    ' >{ r.title }</p>
                                    <img src={ r.image } alt={ r.title } />

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




export default Veggie;