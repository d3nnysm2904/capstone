import { useState, useEffect } from "react";

const useLocalStore = ( key, val = null ) =>
{
    const initialVal = localStorage.getItem( key ) || val;

    const [ item, setItem ] = useState( initialVal );

    useEffect(
        function setItemInLocalStore ()
        {
            if ( item === null )
            {
                localStorage.removeItem( key );
            } else
            {
                localStorage.setItem( key, item );
            }
        },
        [ key, item ]
    );

    return [ item, setItem ];
};

export default useLocalStore;
