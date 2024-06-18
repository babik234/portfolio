const proxyUrl = "https://api.allorigins.win/raw?url=";
let apiUrl = "https://www.freetogame.com/api/games";

let gamesGrid = document.getElementById("games-grid");
search();

async function search() {
    try {
        const data = await getGameData();

        if (data) {
            console.log("Game Data:", data);

            data.forEach((item) => {
                let itemDiv = document.createElement("div");
                itemDiv.className = "game-item";
                itemDiv.innerHTML = `

                   <img src="${item.thumbnail}" alt="" width="300" height="300">
                <div class="description">
                    <div>Title: ${item.title}</div>
                    <div>Genre: ${item.genre}</div>
                </div>
                `;
                gamesGrid.appendChild(itemDiv);
            });
        }
    } catch (error) {
        console.error("Error fetching game data:", error);
    }
}

async function getGameData() {
    try {
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching game data:", error);
        throw error;
    }
}

async function searchOne() {
    try {
        const data = await getGameData();

        if (data) {
            console.log("Game Data:", data);

            let itemDiv = document.createElement("div");
            itemDiv.className = "game-item";
            itemDiv.innerHTML = `

                   <img src="${data.thumbnail}" alt="" width="300" height="300">
                <div class="description">
                    <div>Title: ${data.title}</div>
                    <div>Genre: ${data.genre}</div>
                </div>
                `;
            gamesGrid.appendChild(itemDiv);
        }
    } catch (error) {
        console.error("Error fetching game data:", error);
    }
}

function PC() {
    removeChild();
    apiUrl = " https://www.freetogame.com/api/games?platform=pc";
    getGameData();
    search();
}

function RESET() {
    removeChild();
    apiUrl = "https://www.freetogame.com/api/games";
    getGameData();
    search();
}

function SEARCH() {
    let id = document.getElementById("input").value;
    removeChild();
    apiUrl = "https://www.freetogame.com/api/game?id=" + id;
    getGameData();
    searchOne();
}

function removeChild() {
    let el = gamesGrid;
    while (el.firstChild) el.removeChild(el.firstChild);
}
