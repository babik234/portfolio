const proxyUrl = "https://api.allorigins.win/raw?url=";
let apiUrl = "https://www.freetogame.com/api/games";

let gamesGrid = document.getElementById("games-grid");
let genreButtons = document.getElementById("genre-buttons");
let loading = document.getElementById("loading");
let input = document.getElementById("input");
let gamesData = null;
let genreArray = [];
let mobileClick;
renderData();
async function renderData() {
    gamesData = await getGameData();
    console.log(gamesData);

    gamesData.forEach((item) => {
        if (!genreArray.includes(item.genre)) {
            genreArray.push(item.genre);
        }

        renderItem(item);
    });

    genreArray.forEach((genre, index) => {
        renderGenreButton(genre);

        if (index === genreArray.length - 1) {
            let resetButton = document.createElement("button");
            resetButton.className = "btn";
            resetButton.innerHTML = "Reset filters";
            genreButtons.appendChild(resetButton);

            resetButton.addEventListener("click", RESET);
        }
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
    let itemDivs = document.querySelectorAll(".game-item");

    itemDivs.forEach((item) => {
        item.style.display = "grid";
    });
    input.value = "";
    resetActiveButtons();
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
        <img src="${item.thumbnail}" alt="" width="350" height="250">

        <div class="platform-list">${generatePlatformIcons(item.platform)}</div>
        <div class="title"> ${item.title.toUpperCase()}</div>
    <div class="description">
            <div class="text">Genre: <h3>${item.genre}</h3></div>
            <div class="text">Developer: <h3>${item.developer}</h3></div>
   
            <div class="textD">Description: <h3>${item.short_description}</h3></div>
     
    </div>
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
        input.value = "";
        resetActiveButtons();

        if (buttonActive) {
            items.forEach((item) => {
                item.style.display = "";
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
        if (mobileClick == true) {
            removeGenreButtons();
        }
    });
}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        console.log("enter");
        SEARCH();
    }
});

function generatePlatformIcons(platformList) {
    let platforms = platformList.split(",");
    let platformsToRender = "";

    platforms.forEach((item) => {
        if (item === "PC (Windows)") {
            platformsToRender += `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#fff" class="bi bi-windows" viewBox="0 0 16 16">
                <path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z"/>
              </svg>`;
        } else {
            platformsToRender += `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#fff" class="bi bi-browser-chrome" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M16 8a8 8 0 0 1-7.022 7.94l1.902-7.098a3 3 0 0 0 .05-1.492A3 3 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8M0 8a8 8 0 0 0 7.927 8l1.426-5.321a3 3 0 0 1-.723.255 3 3 0 0 1-1.743-.147 3 3 0 0 1-1.043-.7L.633 4.876A8 8 0 0 0 0 8m5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a3 3 0 0 0-1.252.243 2.99 2.99 0 0 0-1.81 2.59M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
            </svg>`;
        }
    });

    return platformsToRender;
}

function resetActiveButtons() {
    genreButtons.querySelectorAll("button").forEach((button) => {
        button.classList.remove("active");
    });
}
let filtersTabActive;
document.getElementById("filters").addEventListener("click", () => {
    mobileClick = true;
    if (!filtersTabActive) {
        document.getElementById("genre-buttons").style.display = "block";
        filtersTabActive = true;
    } else {
        document.getElementById("genre-buttons").style.display = "none";
        filtersTabActive = false;
    }
});
function removeGenreButtons() {
    itemDivs = document.querySelectorAll(".genre-buttons");
    itemDivs.forEach((item) => {
        item.style.display = "none";
        resetActiveButtons();
    });
}
