import './Category.css';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GiFullPizza, GiHamburger, GiNoodles, GiChopsticks } from 'react-icons/gi';
import UserContext from "../UseContext"

import React, { useContext, useState } from "react";

function Category ()
{
    const { currUser } = useContext( UserContext );
    return (
        <div className='List'>
            <div className="SLink" >
                <SLink to={ '/cuisine/italian' }>
                    <GiFullPizza />
                    <h4>Italian</h4>
                </SLink>
            </div>
            <div className="SLink" >
                <SLink to={ '/cuisine/american' } >
                    <GiHamburger />
                    <h4>American</h4>
                </SLink>
            </div>
            <div className="SLink" >
                <SLink to={ '/cuisine/thai' }>
                    <GiNoodles />
                    <h4>Tai foods</h4>
                </SLink>
            </div>
            <div className="SLink" >
                <SLink to={ '/cuisine/japanese' } >
                    <GiChopsticks />
                    <h4>Japonese</h4>
                </SLink>
            </div>
        </div>
    );
}


// using styled components i was able to add style to the Navlink, is the only way i found 
const SLink = styled( NavLink )`
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 2rem;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);
}

h4 {
    color: white;
    font-size: 0.8rem;
}

svg {
    color: white
    font-size: 2.5rem;

}
&.active{
    svg{
        color:white
    }
    h4{
        color:white
    }
}
`;

export default Category;