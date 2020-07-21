export const standingPL = standing => {
    return `
        <tr>
            <td>${standing.position}</td>
            <td><img src="${standing.team.crestUrl}" class="responsive-img center logo-standing"></td>
            <td>${standing.team.name}</td>
            <td>${standing.playedGames}</td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.points}</td>
        </tr>
    `;
}