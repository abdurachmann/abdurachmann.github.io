import 'regenerator-runtime';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
import {registerRoute} from 'workbox-routing';
import {CacheFirst, StaleWhileRevalidate} from "workbox-strategies";
import {precacheAndRoute} from "workbox-precaching";
import {ExpirationPlugin} from "workbox-expiration";
import {CacheableResponsePlugin} from "workbox-cacheable-response";

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

precacheAndRoute(
    [
        {
            url: '/',
            revision: '1'
        },
        {
            url: '/index.html',
            revision: '1'
        },
        {
            url: '/nav.html',
            revision: '1'
        },
        {
            url: '/src/pages/home.html',
            revision: '1'
        },
        {
            url: '/src/pages/standing.html',
            revision: '1'
        },
        {
            url: '/src/pages/standing-pl.html',
            revision: '1'
        },
        {
            url: '/src/pages/standing-cl.html',
            revision: '1'
        },
        {
            url: '/src/pages/team.html',
            revision: '1'
        },
        {
            url: '/src/pages/favorite.html',
            revision: '1'
        },
        {
            url: '/src/style/style.css',
            revision: '1'
        },
        {
            url: '/src/style/material-design-icons.css',
            revision: '1'
        },
        {
            url: '/src/style/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
            revision: '1'
        },
        {
            url: '/src/images/bird.png',
            revision: '1'
        },
        {
            url: '/src/images/Liverpool_FC.svg',
            revision: '1'
        },
        {
            url: '/src/images/player.png',
            revision: '1'
        },
        {
            url: '/src/images/stadium.jpg',
            revision: '1'
        },
        {
            url: '/bundle.js',
            revision: '1'
        }
    ],
    {
        ignoreURLParametersMatching: [/.*/],
    }
);

registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new StaleWhileRevalidate({
        cacheName: 'kabar-manuk'
    })
);

registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    new CacheFirst({
        cacheName: 'image',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    })
);

self.addEventListener('push', event => {
    let body ;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    const options = {
        body: body,
        icon: '/src/images/icons/android-icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

self.__WB_MANIFEST;
