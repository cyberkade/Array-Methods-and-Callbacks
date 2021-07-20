const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

console.log('TASK 1');

const newArray = fifaData.filter(function(item){
    return item.Year === 2014;
})
const filtered = newArray.filter((item)=>{
    return item.Stage === 'Final';
 });
 console.log(filtered[0]);
//(a) Home Team name for 2014 world cup final
console.log(filtered[0]['Home Team Name']);
//(b) Away Team name for 2014 world cup final
console.log(filtered[0]['Away Team Name']);
//(c) Home Team goals for 2014 world cup final
console.log(filtered[0]['Home Team Goals']);
//(d) Away Team goals for 2014 world cup final
console.log(filtered[0]['Away Team Goals']);
//(e) Winner of 2014 world cup final */
console.log(filtered[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

console.log('TASK 2');

function getFinals(data) {
    const obj = data.filter(function(item){
        return item.Stage === 'Final';
    })
    return obj;
}
// function getFinals(data) {
//    data.filter((item)=>{
//     if(item['Stage'] === 'Final'){
//         return item;
//    }});
// }
// getFinals(fifaData);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

console.log('TASK 3');

function getYears(arr,getFinalscb) {
    const years = [];
    getFinalscb(arr).map((data)=>{
        years.push(data.Year);
    })
    return years;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

console.log('TASK 4');

function getWinners(arr, getFinalscb) {
    const winners = [];
    getFinalscb(arr).filter((item)=>{
        if(item['Home Team Goals'] > item['Away Team Goals']){
            winners.push(item['Home Team Name']);
        }else if(item['Home Team Goals'] < item['Away Team Goals']){
            winners.push(item['Away Team Name']);
        }
    })
    return winners;
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

console.log('TASK 5');
// function getWinnersByYear(arr,getYearscb,getWinnerscb) {
//     const array = [];
//     for(let i = 0; i < getYearscb(arr,getFinals).length; i++){
//         array.push(`In ${getYearscb(arr, getFinals)[i]}, ${getWinnerscb(arr, getFinals)[i]} won the world cup!`)
//     }
//     return array;
// }

function getWinnersByYear(arr,getYearscb,getWinnerscb) {
    const array = [];
    getYearscb(arr, getFinals).forEach((item, index) => array.push(`In ${item}, ${getWinnerscb(arr, getFinals)[index]} won the world cup!`));
    return array;
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

console.log('TASK 6');

function getAverageGoals(getFinalscb) {
    let arr = getFinalscb
    let sum = arr.reduce((total,item)=>{
        let goals = item['Home Team Goals'] + item['Away Team Goals']
        return total + goals;
    },0)
    let avg = sum / getFinalscb.length;
    console.log(sum)
    return avg.toFixed(2);
}

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
    let homeFinals = data.filter(item => item['Stage'] === 'Final' && item['Home Team Initials'] === initials && item['Home Team Goals'] > item['Away Team Goals'])
    let awayFinals = data.filter(item => item['Stage'] === 'Final' && item['Away Team Initials'] === initials && item['Away Team Goals'] > item['Home Team Goals'])
    console.log('THIS IS THE WORLD CUP TOTAL WINS');
    console.log(homeFinals.length + awayFinals.length);

    // let homeTeam = finals.filter(item => item['Home Team Initials'] === initials)
    // let awayTeam = finals.filter(item => item['Away Team Initials'] === initials)
    // let homeWins = homeTeam.filter(item => item['Home Team Goals'] > item['Away Team Goals'])
    // let awayWins = awayTeam.filter(item => item['Away Team Goals'] > item['Home Team Goals'])

}
getCountryWins(fifaData, 'BRA')


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {

    let maxAway = data.reduce((max, item)=>{
        if(item['Away Team Goals'] < max['Away Team Goals']){
            return max
        }else if(max['Away Team Goals'] < item['Away Team Goals'])
        console.log(item['Away Team Goals'])
        return item
    });
    let maxHome = data.reduce((max, item)=>{
        if(item['Home Team Goals'] < max['Home Team Goals']){
            return max
        }else if(max['Home Team Goals'] < item['Home Team Goals'])
        console.log(item['Home Team Goals'])
        return item
    });

    console.log(maxHome)
    console.log(maxAway)
    if(maxHome['Home Team Goals'] < maxAway['Away Team Goals']){
        return maxAway['Away Team Name']
    }else if(maxHome['Home Team Goals'] > maxAway['Away Team Goals']){
        return maxHome['Home Team Name']
    }
}
getGoals(getFinals(fifaData));
console.log(getGoals(getFinals(fifaData)))

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    // let maxAway = data.reduce((max, item)=>{
    //     if(item['Away Team Goals'] < max['Away Team Goals']){
    //         return max
    //     }else if(max['Away Team Goals'] < item['Away Team Goals'])
    //     console.log(item['Away Team Goals'])
    //     return item
    // });
    // let maxHome = data.reduce((max, item)=>{
    //     if(item['Home Team Goals'] < max['Home Team Goals']){
    //         return max
    //     }else if(max['Home Team Goals'] < item['Home Team Goals'])
    //     console.log(item['Home Team Goals'])
    //     return item
    // });

    // console.log(maxHome)
    // console.log(maxAway)
    // if(maxHome['Home Team Goals'] < maxAway['Away Team Goals']){
    //     return maxAway['Away Team Name']
    // }else if(maxHome['Home Team Goals'] > maxAway['Away Team Goals']){
    //     return maxHome['Home Team Name']
    // }
}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
