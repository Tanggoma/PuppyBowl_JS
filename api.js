// API Endpoint
const cohortName = '2302-ACC-PT-WEB-PT-A';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
const PLAYERS_APIURL = `${APIURL}/players`;
const TEAM_APIURL = `${APIURL}/teams`;

/**
 * Fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(PLAYERS_APIURL);
        const playersData = await response.json();
        const playerList = await playersData.data.players;
        console.log(playerList);
        return playerList;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

/**
 * Fetches single player from the API and returns them
 * @returns An array of player object.
 */

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${PLAYERS_APIURL}/${playerId}`);
        const singlePlayerData = await response.json();
        const player = singlePlayerData.data.player;
        console.log(player);
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

/**
 * Fetches player by team from the API and returns them
 * @returns An array of team object.
 */

const fetchPlayersByTeam = async () => {

    try {
        const response = await fetch(`${TEAM_APIURL}`)
        const teamData = await response.json();
        const team = await teamData.data.teams;
        console.log(team);
        return team;
    } catch (error) {
        console.error(error)
    }
}

/**
 * Add new player using post method
 * @returns player list object
 */

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(PLAYERS_APIURL,
            {
                method: 'POST',
                body: JSON.stringify(playerObj),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        const playersData = await response.json();
        const playerList = await playersData.data.players;
        return playerList;
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

/**
 * Delete player by ID using Delete method
 * @returns player list object
 */

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${PLAYERS_APIURL}/${playerId}`, {
            method: 'DELETE'
        });
        const playersData = await response.json();
        const playerList = await playersData.data.players;
        return playerList;
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

export {
    fetchAllPlayers,
    fetchSinglePlayer,
    fetchPlayersByTeam,
    addNewPlayer,
    removePlayer
};