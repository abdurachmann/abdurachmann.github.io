import {baseUrl} from './base_url.js';
import {status, json, error} from  './response.js';
import {fetchApi} from './api_helper.js';
import {teamOverview, teamSquad} from '../components/content/team.js';
import {favorite} from '../components/content/favorite.js';
import {favSquad, getFavSquad, getFavSquadById ,deleteFavSquad} from '../db/squad_controller.js';

export const getTeam = () => {
    if ('caches' in window) {
        document.querySelector("pre-loader").style.display = "block";
        caches.match(fetchApi(`${baseUrl}teams/64/`)).then( response => {
            if (response) {
                response.json().then( overview => {
                    loadTeam(overview);
                })
                .catch(error);
            }
        })
    }

    document.querySelector("pre-loader").style.display = "block";
    fetchApi(`${baseUrl}teams/64/`)
    .then(status)
    .then(json)
    .then( overview => {
        loadTeam(overview);
    })
    .catch(error);
}

export const getSquad = () => {
    if ('caches' in window) {
        document.querySelector("pre-loader").style.display = "block";
        caches.match(fetchApi(`${baseUrl}teams/64/`)).then( response => {
            if (response) {
                response.json().then( async data => {
                    loadSquad(data);
                })
                .catch(error);
            }
        })
    }

    document.querySelector("pre-loader").style.display = "block";
    fetchApi(`${baseUrl}teams/64/`)
    .then(status)
    .then(json)  
    .then( async data => {
        loadSquad(data);
    })
    .catch(error);
}

export const favoriteSquad = () => {
    if ('caches' in window) {
        getFavSquad().then( squads => {
            loadFavoriteSquad(squads);
        })
        .catch(error);
    }
    
    getFavSquad().then( squads => {
        loadFavoriteSquad(squads);
    })
    .catch(error);
} 

function loadTeam(overview) {
    document.querySelector("pre-loader").style.display = "none";
    let teamHTML = teamOverview(overview);
    document.querySelector('#overview').innerHTML = teamHTML;
}

async function loadSquad(data) {
    document.querySelector("pre-loader").style.display = "none";
    let playerHtml = '';
    let squads = data.squad.splice(0, 32);
    for (const squad of squads) {
        const favorited = await getFavSquadById(String(squad.id));
        playerHtml += teamSquad(squad, favorited);
        document.querySelector('#squads-list').innerHTML = playerHtml;
    };
    const favoriteLength = document.querySelectorAll('.fav').length;
    for (let i = 0; i < favoriteLength; i++) {
        const btnFav = document.querySelectorAll('.fav')[i];
        btnFav.addEventListener('click', () => {      
            const data = {
                id : btnFav.getAttribute('data-id'),
                name: btnFav.getAttribute('data-name'),
                national: btnFav.getAttribute('data-national'),
                position: btnFav.getAttribute('data-position')
            }

            favSquad(data);
            btnFav.style.color = '#b71c1c';
            function hide() {
                setTimeout( () => {
                    btnFav.style.display = 'none';
                }, 2000);
            }
            hide();
        })
    }
}

function loadFavoriteSquad(squads) {
    document.querySelector("pre-loader").style.display = "none";
    let deleteHTML = '';
    squads.forEach( squad => {
        deleteHTML += favorite(squad);
        document.getElementById('squads-favorite').innerHTML = deleteHTML;
    });
    document.getElementById('table-fav').style.display = 'none';
    document.getElementById('logo-favorite').style.display = 'none';
    const deleteLength = document.querySelectorAll('.delete').length;
    for (let i = 0; i < deleteLength; i++) {
        const btnDel = document.querySelectorAll('.delete')[i];
        btnDel.style.color = '#b71c1c';
        btnDel.addEventListener('click', () => {  
            const data = {
                id : btnDel.getAttribute('data-id'),
                name: btnDel.getAttribute('data-name'),
                national: btnDel.getAttribute('data-national'),
                position: btnDel.getAttribute('data-position')
            }
            btnDel.style.color = '#fff';
            deleteFavSquad(data.id, data.name);
            function hide() {
                setTimeout( () => {
                    window.location.reload();
                }, 2000);
            }
            hide();
        })
        document.getElementById('table-fav').style.display = 'block';
        document.getElementById('logo-favorite').style.display = 'block';
        document.getElementById('no-favorite').style.display = 'none';
    }
}