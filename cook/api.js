import axios from "axios";
import env from "./env";

const BASE_URL = process.env.REACT_APP_BASE_URL || env.api_url;

let resp = await axios.post( '/users/login', { username: "Migue", password: "123456" } );

let token = resp.data;

await axios.get( '/secret', { params: { _token: token } } );
await axios.post( '/other', { _token: token } );