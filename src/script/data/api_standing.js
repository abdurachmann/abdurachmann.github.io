import {baseUrl} from './base_url.js';
import {status, json, error} from  './response.js';
import {fetchApi} from './api_helper.js';
import {standingPL} from '../components/content/standing-pl.js';
import {standingCL} from '../components/content/standing-cl.js';

export const getStandingPL = () => {
    if ('caches' in window) {
        document.querySelector("pre-loader").style.display = "block";
        caches.match(fetchApi(`${baseUrl}competitions/2021/standings`)).then( response => {
            if (response) {
                response.json().then( data => {
                    loadStanding(data.standings[12].table, standingCL, `#standing-cl`);
                })
                .catch(error);
            }
        })
    }

    document.querySelector("pre-loader").style.display = "block";
    fetchApi(`${baseUrl}competitions/2021/standings`)
    .then(status)
    .then(json)
    .then(data => {
        loadStanding(data.standings[0].table, standingPL, `#standing`);
    })
    .catch(error);
}

export const getStandingCL = () => {
    if ('caches' in window) {
        document.querySelector("pre-loader").style.display = "block";
        caches.match(fetchApi(`${baseUrl}competitions/2001/standings`)).then( response => {
            if (response) {
                response.json().then( data => {
                    loadStanding(data.standings[12].table, standingCL, `#standing-cl`);
                })
                .catch(error);
            }
        })
    }
    document.querySelector("pre-loader").style.display = "block";
    fetchApi(`${baseUrl}competitions/2001/standings`)
    .then(status)
    .then(json)
    .then(data => {
        loadStanding(data.standings[12].table, standingCL, `#standing-cl`);
    })
    .catch(error);
}

function loadStanding(data, component, selector) {
        document.querySelector("pre-loader").style.display = "none";
        let standingHTML = '';
        let standings = data;
        standings.forEach( standing => {
            standingHTML += component(standing);
        })
        document.querySelector(`${selector}`).innerHTML = standingHTML;
}
