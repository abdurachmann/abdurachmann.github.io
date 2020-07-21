export const favorite = squad => {
    return `
        <tr>
            <td>${squad.name}</td>
            <td>${squad.national}</td>
            <td>${squad.position}</td>
            <td>
                <a class="btn right yellow darken-1 delete" data-id="${squad.id}" data-name="${squad.name}" data-national="${squad.nationality}" data-position="${squad.position}">
                    <i class="material-icons">favorite</i>
                </a> 
            </td>
        </tr>
    `;
}