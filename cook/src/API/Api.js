import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class CookApi
{
    // the token for interactive with the API will be stored here.
    static token;

    static async request ( endpoint, data = {}, method = "get" )
    {
        console.debug( "API Call:", endpoint, data, method );

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${ BASE_URL }/${ endpoint }`;
        const headers = { Authorization: `Bearer ${ CookApi.token }` };
        const params = method === "get" ? data : {};

        try
        {
            return ( await axios( { url, method, data, params, headers } ) ).data;
        } catch ( err )
        {
            console.log( "API Error:", err.response );
            let message = err.response.data.error.message;
            throw Array.isArray( message ) ? message : [ message ];
        }
    }

    static async login ( data )
    {
        let res = await this.request( `auth/token`, data, "post" );
        return res.token;
    }

    /** Post a signup for a new user */

    static async signup ( data )
    {
        let res = await this.request( `auth/register`, data, "post" );
        return res.token;
    }

    /** Update user data */

    static async updateUser ( username, data )
    {
        let res = await this.request( `users/${ username }`, data, "patch" );
        return res.user;
    }

    /** Check for user password in order to update de user profile */

    static async checkUserNamePassword ( data )
    {
        let res = await this.request( `users/login`, data, "post" );
        return res.token;
    }

    /** Get user data */

    static async getUser ( username )
    {
        let res = await this.request( `users/${ username }` );
        return res.user;
    }
}

CookApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
export default CookApi;