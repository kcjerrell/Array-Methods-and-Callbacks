import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const task1game = fifaData.find(g => g['Year'] === 2014);
let task1home, task1homescore, task1away, task1awayscore;
console.log(task1home = task1game['Home Team Name']);

//(b) Away Team name for 2014 world cup final
console.log(task1away = task1game['Away Team Name']);

//(c) Home Team goals for 2014 world cup final
console.log(task1homescore = task1game['Home Team Goals']);

//(d) Away Team goals for 2014 world cup final
console.log(task1awayscore = task1game['Away Team Goals']);

//(e) Winner of 2014 world cup final */
function determineWinner(game) {
    const homeScore = game['Home Team Goals'];
    const awayScore = game['Away Team Goals'];

    if (homeScore !== awayScore)
        return homeScore > awayScore ? game['Home Team Name'] : game['Away Team Name'];
    else
        return game['Win conditions'].split(' win ')[0];
}

console.log(task1homescore > task1awayscore ? task1home : task1away)
console.log(determineWinner(task1game));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    return data.filter(g => g.Stage === "Final");
}
console.log(getFinals(fifaData));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, getFinalsFunc) {
    return getFinalsFunc(data).map(g => g.Year);
}
console.log(getYears(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:
1. Receives an array
2. Receives the callback function getFinals from task 2
3. Determines the winner (home or away) of each `finals` game.
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(data, getFinalsFunc) {
    const finals = getFinalsFunc(data);
    return finals.map(g => determineWinner(g));
}
console.log(getWinners(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!"

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getYearsFunc, getWinnersFunc) {
    const years = getYearsFunc(data, getFinals);
    const winners = getWinnersFunc(data, getFinals);

    return years.map((g, i) => `In ${g}, ${winners[i]} won the world cup!`);
}
console.log(getWinnersByYear(fifaData, getYears, getWinners));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following:
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place.

 (Hint: use .reduce and do this in 2 steps)

 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(data) {
    const totalGoals = data.reduce((total, game) => total + game['Home Team Goals'] + game['Away Team Goals'], 0);
    return (Math.round(100 * totalGoals / data.length) / 100).toString();
}
console.log(getAverageGoals(getFinals(fifaData)));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had.

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function determineWinnerInitials(game) {
    const homeScore = game['Home Team Goals'];
    const awayScore = game['Away Team Goals'];

    if (homeScore !== awayScore)
        return homeScore > awayScore ? game['Home Team Initials'] : game['Away Team Initials'];
    else {
        const winner = game['Win conditions'].split(' win ')[0];
        return game['Home Team Name'] === winner ? game['Home Team Initials'] : game['Away Team Initials'];
    }
}
/** @param {fifaData} data */
function getCountryWins(data, country) {
    return data.filter(g => g.Stage === "Final" && determineWinnerInitials(g) === country).length;
}
console.log(getCountryWins(fifaData, 'BRA'));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */
/** @param {fifaData} data */
function getGoals(data) {
    // extract all the scores from the game data
    const appearanceScores = [];
    data.forEach(g => {
        appearanceScores.push({ team: g['Home Team Name'], score: g['Home Team Goals'] });
        appearanceScores.push({ team: g['Away Team Name'], score: g['Away Team Goals'] });
    });

    // total each team's scores and count the number of appearances
    const teamTotals = {};
    appearanceScores.forEach(as => {
        if (teamTotals.hasOwnProperty(as.team)) {
            teamTotals[as.team].total += as.score;
            teamTotals[as.team].games += 1;
        }
        else {
            teamTotals[as.team] = { total: as.score, games: 1 };
        }
    });

    // iterate through each team, calcuating the average and tracking the max
    let highestAvgTeam = ['', 0];
    for (const key in teamTotals) {
        const avg = teamTotals[key].total / teamTotals[key].games;
        if (avg > highestAvgTeam[1])
            highestAvgTeam = [key, avg];
    }

    console.log(`The team with the highest average score per world cup game is ${highestAvgTeam[0]} with an average score of ${highestAvgTeam[1]}`)
    return highestAvgTeam[0];
}
console.log(getGoals(fifaData));


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/** @param {fifaData} data */
function getCountryAppearances(data, country) {
    const games = data.filter(g => g['Home Team Initials'] === country || g['Away Team Initials'] === country);
    const years = games.map(g => g.Year);
    return new Set(years).size;
}
console.log(getCountryAppearances(fifaData, 'FRA'));

/** @param {fifaData} data */
function totalGoals(data, country) {
    let total = 0;
    data.forEach(g => {
        if (g['Home Team Initials'] === country)
            total += g['Home Team Goals'];
        else if (g['Away Team Initials'] === country)
            total += g['Away Team Goals'];
    })
    return total;
}
console.log(totalGoals(fifaData, 'FRA'));

//Not sure WHICH country names you want, so I'll just make a heading for each world cup final
/** @param {fifaData} data */
function finalsHeading(data)
{
    return data.filter(g=> g.Stage === 'Final').map(g => `<h1>${g.Year}: ${g['Home Team Name']} vs ${g['Away Team Name']}</h1>\n`);
}
console.log(finalsHeading(fifaData));

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
    console.log('its working');
    return 'bar';
}
export default {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
