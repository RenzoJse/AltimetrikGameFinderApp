const urlKey = "https://api.rawg.io/api/games?key=0c6eb2ab6e004f59b3efd16030f271a2";
let ul = document.querySelector('.games-List');
let logout = document.querySelector('.logout-button');

window.onload = () => {
    load();
};

function load () {
    console.log('loaded');
    loadCards(urlKey); 
}

 async function loadAPI(urlKey) { 
    let response = await fetch(urlKey);
    let data = await response.json();
    return data;
  };

  async function loadCards(urlKey) {
    let data = await loadAPI(urlKey);
    ul.innerHTML = "";
    data.results.map((arr,i) => {
        arr = data.results[i];
        console.log(arr);
        ul.insertAdjacentHTML('beforeend', 
        `<li class="card">

            <div class="card__img">
                <img src="${arr.background_image || './img/image-not-found.jpg'}" class="background-img">
            </div>

            <div class="card-info">

                <div class ="top-Info">
                <h2 class="game-Title">${arr.name}</h2>
                <h2 class="ranking">#${i+1}</h2>
                </div>

                <div class = "additional-Info">

                    <h3 class="release-Date">Release date:</h3>
                    <h3 class="release-Obtain">${released(arr)}</h3>
                    <div class="platforms-Box">
                    ${loadPlatforms(arr)}
                    </div>

                    <h3 class="genres">Genres:</h3>
                    <div class="genres-Types">${insertGenre(arr)}</div>

                </div>

            </div>    
               
        </li>

            `);
        });
    };

 function released(arr) { 
    let release = new Date(arr.released);
    release = release.toDateString().split(' ').slice(1).join(' ');
    return release;
 }

 function insertGenre(arr) {
    let card = "";
    for (let j = 0; j < arr.genres.length; j++) {
        let genreValue = arr.genres[j];
        
        if (j < arr.genres.length - 1) {
            card += `<h3 class="genres-value">${genreValue.name}, &nbsp</h3>`;
        } else {
           card += `<h3 class="genres-value">${genreValue.name}</h3>`;
        }  
    };
    return card; 
}

 function loadPlatforms(arr) {
    let platforms = arr.parent_platforms; 

    if (platforms) {
        let addIcon = (x) =>{
            let icon = './img/' + x + '.png';
            card += `<img src="${icon}" height="16px" width="18px" class="icon-Platform">`;
            return card;
        }

        let card = ""; 
        for (let k = 0; k < platforms.length; k++) {
                switch (platforms[k].platform.id) {
                    case 1:
                        addIcon('ps');
                        break;
                    case 2:
                        addIcon('xbox');
                        break;
                    case 3:
                        addIcon('pc');
                        break;
                    default:
                        break;
                } 
        }   
        return card;
    }

};
    
logout.addEventListener('click', () => {
    window.location = 'login.html';
})
