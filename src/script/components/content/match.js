export const matchHome = matches => {
    return `
        <div class="card small grey lighten-5 match">
            <div class="center leagues">
                <h4 class="competition">${matches.competition.name}</h4>
                <h6>Matchday ${matches.matchday}</h6>
            </div>
            <div class="col s4 home-team center">
                <p class="black-text">${matches.homeTeam.name}</p>
            </div>

            <div class="col s1 score-home center black-text">
                <p>${matches.score.fullTime.homeTeam}</p>
            </div>

            <div class="col s2 center score black-text">
                <p>:</p>
            </div>

            <div class="col s1 score-away center black-text">
                <p>${matches.score.fullTime.awayTeam}</p>
            </div>

            <div class="col s4 away-team center">
                <p class="black-text">${matches.awayTeam.name}</p>
            </div>
        </div>
    `
}