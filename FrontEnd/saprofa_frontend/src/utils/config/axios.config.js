import axios from 'axios';

//Default config for axios
export default axios.create({
    baseURL: 'https://saprofa.azurewebsites.net', //URL of the API
    responseType: 'json',
    // mode: 'no-cors',
    timeout: 2000,    //Request will fail if the response is not received within 2000ms
    headers: {
        'Content-Type': 'application/json;odata=verbose'
    }
});