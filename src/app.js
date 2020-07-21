import 'regenerator-runtime';
import './style/style.css';
import './style/material-design-icons.css';
import 'materialize-css/dist/js/materialize.min.js';
import './script/components/app-bar.js';
import './script/components/loader.js';
import loadNav from './script/components/nav.js';
import {loadPage} from './script/components/loadPage.js';
import {urlBase64ToUint8Array} from './script/utils/convert.js';


document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    loadNav();
    let page = window.location.hash.substr(1);
    if (page === '') {
        page = 'home';
    } else if (page === '#standing') {
        page = 'standing';
    }

    loadPage(page);

    // Check serviceworker
    if (!('serviceWorker' in navigator)) {
        console.log('Notification not support by browser!');
    } else {
        registerServiceWorker();
        requestPermission();
    }

    // Register serviceworker
    function registerServiceWorker() {
        return navigator.serviceWorker.register('/service-worker.js')
            .then( registration => {
                console.log('Register ServiceWorker has been successfully');
                return registration;
            })
            .catch( err => {
                console.error('ServiceWorker register failed', err);
            });
    }

    // Request permission
    function requestPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then( result => {
                if (result === 'denied') {
                    console.log('Notification not allowed');
                    return;
                } else if (result === 'default') {
                    console.error('Permission not respond');
                    return;
                }  
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration()
                    .then( registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array('BILNZPiAkgx2TTchyeTziDfiU2Imr7f14euRYzDEK2R-3_S_svUP9cwsN8ocltGLSiNkGq-YQwMoeSkldF8-iDk')
                        }) .then( subscribe => {
                            console.log('Subscribe with endpoint has been successfully: ', subscribe.endpoint);
                            console.log('Subscribe with p256dh key has been successfully: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh'))
                            )));
                            console.log('Subscribe with auth key has been successfully: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth'))
                            )));
                        }) .catch( err => {
                            console.error('cant subscribe ', err.message);
                        });
                    });
                }
            });
        }
    }
})