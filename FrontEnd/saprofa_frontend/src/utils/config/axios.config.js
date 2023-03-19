import axios from 'axios';

//Default config for axios
export default axios.create({
    baseURL: 'https://localhost:7216', //URL of the API
    responseType: 'json',
    // mode: 'no-cors',
    //timeout: 2000,    //Request will fail if the response is not received within 2000ms
    headers: {
        'Content-Type': 'application/json;odata=verbose',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    }
});