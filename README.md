# Puppy Bowl Players 
![Ruff Fluff!](https://media0.giphy.com/media/utcOe7dBHsX9Xd0MfM/giphy.gif)

Live Site: https://tanggoma.github.io/PuppyBowl_JS/
###### by tanggoma

#
This puppy bowl web app let you create new player through add new player form and choose the team for them, or even delete the unwanted puppy player from the team. You can also either see the lists of all players from the game or see the players by team ruff or fluff! :) 


## **What you can do** 
:dog:
#### 
- Create new puppy player on your own by submitting name, breed, status, image URL and choose the team for them. 
- Render all puppy players' name which you can click to see details of each pups. You will see their breed and status of them when you click "see details" button. 
- Render puppy players by team. The puppies will be seperated to 2 team 1) Team ruff 2) Team fluff
- Delete unwanted puppy from the player lists.


Note* if people delete all the players from the list, you will not see it. I encourage you to add new player and then come back and see the player by team :) 

#
## Skills
:dog:
 - Javascript, Regex, CSS, HTML, 

#
## Functions summary
:dog:
 ### Fetch data - api.js
 
 -  **fetchAllPlayers**: Fetches all players from the API and returns them as an array of objects.
-   **fetchSinglePlayer**: Fetches a single player from the API based on the provided player ID and returns the player object.
-   **fetchPlayersByTeam**: Fetches players grouped by team from the API and returns them as an array of team objects.
-   **addNewPlayer**: Sends a POST request to the API to add a new player based on the provided player object and returns the updated player list.
-   **removePlayer**: Sends a DELETE request to the API to remove a player based on the provided player ID and returns the updated player list.

### Render data - render.js

 -   **renderAllPlayers**: Takes an array of player objects, creates HTML elements for each player, and adds event listeners to the buttons in each player card. It also handles fetching single player details and removing players from the roster.
-   **renderSinglePlayer**: Renders the details of a single player by fetching the player from the API and displaying the information on the webpage.
-   **renderNewPlayerForm**: Renders a form to add a new player to the roster and handles form submission. I added more code to validate input data in the form. 
-   **renderPlayerByteam**: Renders the players grouped by team on the webpage and adds event listeners for showing player details and navigating back.
-   **init**: Initializes the application by fetching all players and team data, and rendering the players and new player form on the webpage.




