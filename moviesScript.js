const proxyUrl = "https://api.allorigins.win/raw?url=";
let apiUrl = "https://www.freetogame.com/api/games";

let gamesGrid = document.getElementById("games-grid");
let genreButtons = document.getElementById("genre-buttons");
let loading = document.getElementById("loading");

let gamesData = null;
let genreArray = [];

renderData();
async function renderData() {
    gamesData = await getGameData();
    gamesData.forEach((item) => {
        if (!genreArray.includes(item.genre)) {
            genreArray.push(item.genre);
        }

        renderItem(item);
    });

    genreArray.forEach((genre) => {
        renderGenreButton(genre);
    });

    loading.style.display = "none";
}
async function search() {
    try {
        const data = await getGameData();

        if (data.length > 1) {
            console.log("Game Data:", data);

            data.forEach((item) => {
                renderItem(item);
            });
        } else {
            renderItem(data);
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

function PC() {
    itemDivs = document.querySelectorAll(".game-item");
    itemDivs.forEach((item) => {
        if (item.innerHTML.includes("PC")) {
        } else {
            item.style.display = "none";
        }
    });
}

function RESET() {
    itemDivs = document.querySelectorAll(".game-item");
    itemDivs.forEach((item) => {
        item.style.display = "grid";
    });
    genreClicked = true;
    genreSort();
}

function SEARCH() {
    let value = document.getElementById("input").value;
    value = value.toUpperCase();
    itemDivs = document.querySelectorAll(".game-item");
    itemDivs.forEach((item) => {
        let titleDiv = item.querySelector(".title").textContent.toUpperCase();
        if (titleDiv.includes(`${value}`)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function removeChild() {
    let el = gamesGrid;
    while (el.firstChild) el.removeChild(el.firstChild);
}

function renderItem(item) {
    let itemDiv = document.createElement("div");
    itemDiv.setAttribute("data-genre", item.genre);
    itemDiv.setAttribute("data-platform", item.platform);
    itemDiv.className = "game-item";
    itemDiv.innerHTML = `
    <div class="grid">
        <img src="${item.thumbnail}" alt="" width="400" height="300">
    
            <div class="title"> ${item.title.toUpperCase()}</div>
        <div class="description">
            <div>Genre: ${item.genre}</div>
            <div>platform: ${item.platform}</div>
        </div>
     <div class="hover"></div>
    </div>
    `;
    gamesGrid.appendChild(itemDiv);
    itemDiv.addEventListener("mouseover", () => {
        console.log("AD");
    });
}

function renderGenreButton(genre) {
    let button = document.createElement("button");
    button.setAttribute("data-genre", genre);
    button.className = "genre-button";
    button.innerHTML = genre;

    genreButtons.appendChild(button);

    button.addEventListener("click", () => {
        let buttonActive = button.classList.contains("active");
        let items = gamesGrid.querySelectorAll(`.game-item`);

        if (buttonActive) {
            let selectedItems = gamesGrid.querySelectorAll(`[data-status="${genre}"]`);

            items.forEach((item) => {
                let itemGenre = item.getAttribute("data-genre");

                if (genre == itemGenre) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });
        } else {
            items.forEach((item) => {
                let itemGenre = item.getAttribute("data-genre");

                if (genre == itemGenre) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });

            button.classList.add("active");
        }
    });
}

document.getElementById("platform-pc").addEventListener("click", PC);
