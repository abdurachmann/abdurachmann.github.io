import {baseUrl} from './base_url.js';
import {status, json, error} from  './response.js';
import {fetchApi} from '../data/api_helper.js';
import {matchHome} from  '../components/content/match.js';

export const getMatches = () => {
    if ('caches' in window) {
        document.querySelector("pre-loader").style.display = "block";
        caches.match(fetchApi(`${baseUrl}teams/64/matches`)).then( response => {
            if (response) {
                response.json().then( data => {
                    loadMatch(data);
                })
                .catch(error);
            }
        })
    }

    document.querySelector("pre-loader").style.display = "block";
    fetchApi(`${baseUrl}teams/64/matches`)
    .then(status)
    .then(json)
    .then( data => {
        loadMatch(data);
    })
    .catch(error);
} 

function loadMatch(data) {
    document.querySelector("pre-loader").style.display = "none";
    let matchHTML = '';
    let match = data.matches.splice(11, 10);
    match.forEach( matches => {
        matchHTML += matchHome(matches);
    });
    return document.querySelector('#matches').innerHTML = matchHTML;
}