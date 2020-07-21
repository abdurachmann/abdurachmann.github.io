import {token} from './base_url.js';

export const fetchApi = url => {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Auth-Token': token 
        }
    });
};