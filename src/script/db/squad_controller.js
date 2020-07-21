import {createDB} from './db.js';

export const favSquad = (squad) => {
    createDB
            .then( db => {
                const tx = db.transaction('squads', 'readwrite');
                const store = tx.objectStore('squads');
                store.put(squad);
                return tx.complete;
            })
            .then( () => {
                let toast = `<h6 class="toast-content">${squad.name} has been favorited</h6>`;
                M.toast({
                    html : toast,
                    classes: 'rounded',
                })
            })
};

export const getFavSquad = () => {
    return new Promise( (resolve, reject) => {
        createDB
            .then( db => {
                const tx = db.transaction('squads', 'readonly');
                const store = tx.objectStore('squads');
                return store.getAll();
            })
            .then( squad => {
                resolve(squad);
            });
    });
};

export const getFavSquadById = (id) => {
    return new Promise( (resolve, reject) => {
        createDB
            .then( db => {
                const tx = db.transaction('squads', 'readonly');
                const store = tx.objectStore('squads');
                return store.get(id);
            })
            .then( squad => {
                resolve(squad);
            })
    })
}

export const deleteFavSquad = (id, name) => {
    createDB
        .then( db => {
            const tx = db.transaction('squads', 'readwrite');
            const store = tx.objectStore('squads');
            store.delete(id);
            return tx.complete;
        })
        .then( () => {
            M.toast({
                html : `${name} has been un favorited`,
                classes: 'rounded',
            })
        })
};