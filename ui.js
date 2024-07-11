let games = [];
let description = {};
// import {spiner,displaySpiner} from './app.js'
let loder= document.getElementById('spiner')

function  spiner() {
  return new Promise (function(callback){
    loder.classList.replace('d-none','d-flex')
    callback()
  } )
  
}
 function  displaySpiner() {
  return new Promise(function (callback) {
    loder.classList.replace('d-flex','d-none')
    callback()
  })
  
}
class getAllGames {
  async getGames() {
    return new Promise(async function (callback) {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "36e6f007bfmsh4efa40e7566fad9p11984fjsncf1a49d6c90d",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      let myData = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg`,
        options
      );
      let response = await myData.json();
      games = response;
      callGames.displyData();
      try {
        let links = document.querySelectorAll(".nav-link");
        for (let i = 0; i < links.length; i++) {
          links[i].addEventListener("click", async function (e) {
            spiner();
            for (let x = 0; x < links.length; x++) {
              links[x].classList.remove("active");
              links[i].classList.add("active");
            }
            let myData = await fetch(
              `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${e.target.innerHTML}`,
              options
            );
            let response = await myData.json();
            games = response;
            callGames.displyData();
            theDeta.getDetails()
            displaySpiner()
          });
        }
      } catch (error) {
        console.error(error);
      }
      callback();
    });
  }
  displyData() {
    let cartona = "";
    for (let i = 0; i < games.length; i++) {
      cartona += `
          <div class="col-md-3">
                      <div id='cards' class="cards">
                          <div class="card p-2">
                              <img src=${games[i].thumbnail} class="card-img-top" alt="...">
                              <div class="name m-2 d-flex justify-content-between align-items-center">
                                  <h3 class="fs-6">${games[i].title}</h3>
                                  <button type="button" class="btn btn-primary button d-flex align-items-center justify-content-center">free</button></div>
                              <div class="card-body text-center">
                                <p class="card-text">${games[i].short_description}</p></div>
                              <div class="card-footer text-center d-flex justify-content-between align-items-center">
                                  <span>${games[i].genre}</span>
                                  <span>PC (Windows)</span>
                              </div>
                            </div>    
                      </div>
                  </div>
          `;
    }
    document.getElementById("demo").innerHTML = cartona;
  }
}
let callGames = new getAllGames();

class details {
  async getDetails() {
    return new Promise(async function (callback) {
      let cards = document.querySelectorAll("#cards");
      for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", async function (e) {
          spiner();
          document
            .querySelector(".poup-up")
            .classList.replace("d-none", "d-block");
          const options = {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "36e6f007bfmsh4efa40e7566fad9p11984fjsncf1a49d6c90d",
              "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            },
          };
          try {
            let theGame = await fetch(
              `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${games[i].id}`,
              options
            );
            let response2 = await theGame.json();
            description = response2;
            theDeta.displyDetailes();
            displaySpiner();
            document
              .getElementById("btnClose")
              .addEventListener("click", function () {
                document
                  .querySelector(".poup-up")
                  .classList.replace("d-block", "d-none");
              });

          } 
          catch (error) {
            console.error(error);
          }
        });
      }
      callback();
    });
  }
  displyDetailes() {
    let cartona2 = "";
    cartona2 += `
 <header class="d-flex justify-content-between p-5">
          <h1>Details Game</h1>
          <button
            class="btn-close btn-close-white"
            id="btnClose"
          ></button>
        </header>
        <div class="row">
          <div class="col-md-4">
            <img class="w-100" src=${description.thumbnail} alt="" />
          </div>

          <div class="col-md-8">
            <h3>Title: ${description.title}</h3>
            <p>Category: <span class="bg-info rounded-2">${description.genre}</span></p>
            <p>Platform: <span class="bg-info rounded-2">${description.platform}</span></p>
            <p>Status: <span class="bg-info rounded-2">${description.status}</span></p>
            <p>${description.description}</p>
            <a class="btn btn-outline-warning" target="_blank" href="${description.game_url}">show game</a>
          </div>
        </div>
`;
    document.getElementById("details").innerHTML = cartona2;
  }
}
let theDeta = new details();



spiner().then(function () {
  return callGames.getGames()
}).then(function() {
  return displaySpiner();
  
})
.then(function () {
  return theDeta.getDetails();
});

