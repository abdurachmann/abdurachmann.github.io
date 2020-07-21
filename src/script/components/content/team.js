export const teamOverview = overview => {
    return `
        <div class="row">
            <div class="col s2 m2 l1">
                <img src="${overview.crestUrl}" alt="logo" class="responsive-img badge-team">
            </div>
            <div class="col s10 m4 l3">
                <h5>${overview.name}</h5>
                <h6>${overview.venue}</h6>
                <h6>${overview.founded}</h6>
            </div>

            <div class="col m6 l8">
                <button class="btn waves-effect waves-light col s12 l12 btn official-btn red darken-4" type="submit" name="action">Official App
                    <i class="material-icons center right">arrow_forward</i>
                </button>
                <button class="btn waves-effect waves-light col s12 l12 btn official-btn red darken-4" type="submit" name="action">Official Website
                    <i class="material-icons center right">arrow_forward</i>
                </button>
                <button class="btn waves-effect waves-light col s12 l12 btn official-btn red darken-4" type="submit" name="action">Club Tickets Information
                    <i class="material-icons center right">arrow_forward</i>
                </button> 
            </div>
        </div>
        <div class="row">
            <div class="col s12 l7">
                <h6><i class="material-icons left">location_on</i>${overview.address}</h6>
            </div>
            <div class="col s12 l7">
                <h6><i class="material-icons left">phone</i>${overview.phone}</h6>
            </div>
            <div class="col s12 l7">
                <h6><i class="material-icons left">mail</i>${overview.email}</h6>
            </div>
        </div>
    `;
}


export const teamSquad = (squad, favorited) => {
    return `
        <tr>
            <td>${squad.name}</td>
            <td>${squad.nationality}</td>
            <td>
                <a ${(favorited ? 'style="display:none"':'')} class="btn right yellow darken-1 fav" data-id="${squad.id}" data-name="${squad.name}" data-national="${squad.nationality}" data-position="${squad.position}">
                    <i class="material-icons">favorite</i>
                </a>
            </td> 
        </tr>
    `;
}