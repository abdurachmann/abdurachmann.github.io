import {loadPage} from './loadPage.js'

export default function loadnav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status != 200) return;

            document.querySelectorAll('.sidenav, .topnav').forEach( elm => {
                elm.innerHTML = xhttp.responseText;
            });

            document.querySelectorAll('.sidenav a, .topnav a').forEach( elm  => {
                elm.addEventListener('click', event => {
                    const sidenav = document.querySelector('.sidenav');
                    M.Sidenav.getInstance(sidenav).close();

                    const page = event.target.getAttribute('href').substr(1);
                    loadPage(page);
                });
            });
        }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
}