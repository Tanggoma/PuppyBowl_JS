// Import all API fetch 
import {
    fetchAllPlayers,
    fetchSinglePlayer,
    fetchPlayersByTeam,
    addNewPlayer,
    removePlayer
} from './api.js';

// Get to DOM element 
const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');
const playerDetail = document.getElementById('player-detail');
const btnPlayerbyTeam = document.getElementById('playerByTeam');
const teamContainer = document.getElementById('team-container');


/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        playerContainer.innerHTML = '';
        //loop through each players
        playerList.forEach(player => {
            // create div tag for each players
            const playerElement = document.createElement('div');
            playerElement.classList.add('player');
            playerElement.innerHTML = `
            <img src=${player.imageUrl}></img>
            <div class="container">
            <h2>${player.name}</h2>
            
            <button class="details-button" data-id="${player.id}">See Details</button>
            <button class="delete-button" data-id="${player.id}"> X</button>
  </div> 
      `;
            playerContainer.appendChild(playerElement);
            teamContainer.style.display = 'none'


            // see details
            const detailsButton = playerElement.querySelector('.details-button');
            detailsButton.addEventListener('click', async (event) => {
                // get the id
                const playerId = event.target.dataset.id
                // send id to renderSinglePlayerById function
                renderSinglePlayer(playerId)
            });

            // delete details
            const deleteButton = playerElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', async (event) => {
                // get the id
                const playerId = event.target.dataset.id
                console.log(playerId)
                // pass the id to deleteParty function
                await removePlayer(playerId)
                init();

            });
        })

    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


const renderSinglePlayer = async (playerId) => {
    try {
        // fetch playerList from server 

        const player = await fetchSinglePlayer(playerId);

        // pull data Breed, Status, Team attach to DOM 

        const playerDetailsElement = document.createElement('div');
        playerDetailsElement.classList.add('player_single');
        playerDetailsElement.innerHTML = `
        <img src=${player.imageUrl} width="50px" height="auto"></img>
        <div class="container">
            <h2>${player.name}</h2>
            <p> Breed: ${player.breed}</p>
            <p> Status: ${player.status}</p>
            <button class="close-button">Close</button>
        </div>
        `
        // hide the player list container
        playerContainer.style.display = 'none'

        // put the party details on the page ( in the container )
        playerDetail.appendChild(playerDetailsElement);

        // if team id  is the same , assign team A other team B 

        // add event listener to close button
        const closeButton = playerDetail.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            playerDetailsElement.remove();
            playerContainer.style.display = 'flex'
        });

    } catch (error) {
        console.error(error);
    }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        const formElement = document.createElement('form');

        formElement.innerHTML = `
            <label for="name"> Name: </label>
            <input type="text" id="name" name="name" placeholder="name"><br>
            <label for="breed"> Breed: </label>
            <input type="text" id="breed" name="breed" placeholder="breed"><br>
            <label for="status"> Status: </label>
            <select id="status" name="status">
            <option value="field">Field</option>
            <option value="bench">Bench</option>
            </select><br>
            <label for="img">Image URL: </label>
            <input type="url" id="img" name="img" placeholder="img"><br>
            <label for="team"> Team: </label>
            <select id="team" name="team">
            <option value="375">Ruff</option>
            <option value="376">Fluff</option>
            </select><br>
            <button type="submit" id="submit-button">Create</button>
            <button type="button" id="cancel-button">Cancel</button>
          `;
        // add player button
        const addButton = document.querySelector('#add-button');
        addButton.addEventListener('click', (event) => {
            event.preventDefault();
            newPlayerFormContainer.appendChild(formElement)
            addButton.style.display = 'none'
            playerContainer.style.display = 'none'
            playerDetail.style.display = 'none'

        })

        // cancel button
        const cancelButton = formElement.querySelector('#cancel-button');
        cancelButton.addEventListener('click', () => {
            formElement.remove();
            window.location.reload();
        })

        // create button and submit 
        const createButton = formElement.querySelector('#submit-button');

        createButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const name = formElement.querySelector('#name').value;
            const breed = formElement.querySelector('#breed').value;
            const status = formElement.querySelector('#status').value;
            const imageUrl = formElement.querySelector('#img').value;
            const teamId = formElement.querySelector('#team').value;

            // check input value if they are all filled in and if the image url is valid using regex
            if (!name || !breed || !status || !imageUrl || !teamId) {
                alert("Please fill in all information.");
                return
            } else if (!/^https?:\/\/(?:[a-z]+\.)?[a-z0-9-]+\.[a-z]{2,}(?:\/[^/]+)*\/[^/]+\.(?:jpe?g|png)$/i.test(imageUrl)) {
                alert("Please enter a valid URL. Only JPEG and PNG files are accepted.");
                return
            };

            // create new player object
            const newPlayer = {
                name,
                breed,
                status,
                imageUrl,
                teamId
            };
            console.log(newPlayer);

            await addNewPlayer(newPlayer);
            init();
            alert('New Player Added!')
            formElement.remove();
            window.location.reload();
        });

    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
};

// render player by team 
const renderPlayerByteam = async (team) => {

    try {
        // Fetch player by team 
        const teamRuff = team[0]
        const playersRuff = teamRuff.players
        //console.log(playersRuff)

        const teamFluff = team[1]
        const playersFluff = teamFluff.players
        //console.log(playersFluff)

        teamContainer.innerHTML = '';

        // Create DOM html element for each team 

        const h3Ruff = document.createElement('h3');
        h3Ruff.innerText = "Team Ruff"
        teamContainer.appendChild(h3Ruff)

        const h3Fluff = document.createElement('h3');
        h3Fluff.innerText = "Team Fluff"
        teamContainer.appendChild(h3Fluff)

        const ruffDiv = document.createElement('div')
        ruffDiv.classList.add('team-ruff');
        h3Ruff.appendChild(ruffDiv);
        const fluffDiv = document.createElement('div')
        fluffDiv.classList.add('team-fluff');
        h3Fluff.appendChild(fluffDiv);

        const backBtn = document.createElement('button')
        backBtn.classList.add('back-button');
        backBtn.innerText = "Back";
        teamContainer.appendChild(backBtn);

        // Loop through each players array and render to DOM by id(375,376) , showing name and player 

        // Team Ruff
        playersRuff.forEach(playerRuff => {

            const ruffElement = document.createElement('div');
            ruffElement.classList.add('team-player')
            ruffElement.innerHTML = `
            <img src=${playerRuff.imageUrl} id="teamImg" ></img>
            <div class="container-team">
            <h2>${playerRuff.name}</h2>
            <p> Breed: ${playerRuff.breed}</p>
            <p> Status: ${playerRuff.status}</p>    
            </div>
            `;
            ruffDiv.appendChild(ruffElement)

        });
        // Team Fluff
        playersFluff.forEach(playerFluff => {

            const fluffElement = document.createElement('div');
            fluffElement.classList.add('team-player')
            fluffElement.innerHTML = `
            <img src=${playerFluff.imageUrl} id="teamImg"></img>
            <div class="container-team">
            <h2>${playerFluff.name}</h2>
            <p> Breed: ${playerFluff.breed}</p>
            <p> Status: ${playerFluff.status}</p>    
            </div>
            `;
            fluffDiv.appendChild(fluffElement)

        });

        // Add Event listener when mouseenter and mouseleave for each team
        const teamPlayerImg = document.querySelectorAll('#teamImg');
        //console.log(teamPlayerImg)
        const teamDetail = document.querySelectorAll(".container-team");
        //console.log(teamDetail)
        teamPlayerImg.forEach((teamPlayerImg, index) => {

            teamPlayerImg.addEventListener('mouseenter', (event) => {
                event.preventDefault();
                teamDetail[index].style.display = 'block';

            })
            teamPlayerImg.addEventListener('mouseleave', (event) => {
                event.preventDefault();
                teamDetail[index].style.display = 'none';

            })
        });

        // Show player by Team button
        btnPlayerbyTeam.addEventListener('click', async (event) => {
            event.preventDefault();
            console.log(event);
            playerContainer.style.display = 'none'
            await renderPlayerByteam(team)
            teamContainer.style.display = 'grid';
        });

        // Back button - event listener
        backBtn.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(event);
            teamContainer.remove();
            window.location.reload();
        });
    }
    catch (error) {
        console.error(error);
    }
};

const init = async () => {
    const players = await fetchAllPlayers();
    const team = await fetchPlayersByTeam();
    renderAllPlayers(players);
    renderPlayerByteam(team);
    renderNewPlayerForm();
};

init();