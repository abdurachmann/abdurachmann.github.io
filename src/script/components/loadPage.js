import {getMatches} from '../data/api_match.js';
import {getStandingPL, getStandingCL} from '../data/api_standing.js';
import {getTeam, getSquad, favoriteSquad} from '../data/api_team.js';

export const loadPage = page => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            let content = document.getElementById('main-content');
            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
                loadApi(page);
            } else if (this.status === 404) {
                content.innerHTML = '<h2>Page not found</h2>';
            } else {
                content.innerHTML = '<h2>Something went wrong</h2>';
            }

            document.querySelectorAll('.dropdown-content a').forEach( elm  => {
                elm.addEventListener('click', event => {
                    const page = event.target.getAttribute('href').substr(1);
                    loadPage(page);
                });
            });
        }
        const dropdownLeague = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdownLeague, {
            closeOnClick: true,
        });

        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);

        const squad = document.querySelectorAll('.collapsible.expandable');
        M.Collapsible.init(squad, {
            accordion: false
        });
    };
    xhttp.open('GET', `src/pages/${page}.html`, true);
    xhttp.send();
    
}

function loadApi(page) {
    switch (page) {
        case 'home':
            getMatches();
            break;
        case 'standing': 
            getStandingPL();
            break;
        case 'standing-pl':
            getStandingPL();
            break;
        case 'standing-cl':
            getStandingCL();
            break;
        case 'team':
            getTeam();
            getSquad();
            break;
        case 'favorite':
            favoriteSquad();
            break;
        default:
            break;
    }
}