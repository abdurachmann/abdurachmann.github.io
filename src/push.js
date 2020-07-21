const webPush = require('web-push');

const vapidKeys = {
    'publicKey': 'BILNZPiAkgx2TTchyeTziDfiU2Imr7f14euRYzDEK2R-3_S_svUP9cwsN8ocltGLSiNkGq-YQwMoeSkldF8-iDk',
    'privateKey': 'p6TMvd6Ue9UOcg5vVJvkIy6sO0-Gip5Y9fQHgllxmt0'
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/fCh21I9VGhE:APA91bG-TukdFfnO7g3trJ5uxjEq3PSZprgoAQc7pOJKHB_WSHwsWtThCMDH5nVJ8gAU_M7XW2KZCpReRUeXjMU5NaO4zY2rhizU17PB11Qs1T-77XpLCD4qPP7pV7cYihS_zqE7q-NL',
    'keys': {
        'p256dh': 'BBgOM1D6F8pYcP0HbeQMxpjepMELw3if3/3Qr9iXGyXN/yxs59Yf8ZNxwDY/kNWhOwhKWJQLMk0Hwa/Pu8UxceQ=',
        'auth': 'qP+fVc6m0+gYvKjo53FXZw=='
    }
}

const payload = 'Congrats! Your App can already receive push notifications!';

const options = {
    gcmAPIKey: '941296991708',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);