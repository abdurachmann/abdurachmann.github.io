import idb from 'idb';


export const createDB = idb.open('kabar-manuk', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('squads')) {
        const squadsObjectStore = upgradeDb.createObjectStore('squads', {
            keyPath: 'id',
            autoIncrement: true
        });

        squadsObjectStore.createIndex('id', 'id', { 
            unique: false 
        });
    }
});