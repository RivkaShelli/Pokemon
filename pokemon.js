const shapes = document.getElementById("shapes");
const species = document.getElementById("species");
const pokemons = document.getElementById("pokemon");
const viewCard = document.getElementById("view-card");
const shapesEndPoint = "https://pokeapi.co/api/v2/pokemon-shape";
const title = document.getElementById("title");
const progress = document.getElementById("progress");
var myShape;
var mySpecies;

let getShapes = () => fetch(shapesEndPoint).then(res => res.json()).then(res1 => {
    console.log(res1.results);
    return (res1.results);
}).then(res2 => {
    for (let i = 0; i < res2.length; i++) {
      shapes.innerHTML += `<button class= "shape btn btn-warning m-1 btn-lg" data-idx = "${i + 1}">${res2[i].name}</button><br>`;
    }
});

getShapes();

shapes.addEventListener('click', getSpecies);

function getSpecies(e) {
    fetch(`https://pokeapi.co/api/v2/pokemon-shape/${e.target.dataset.idx}/`).then(res => res.json()).then(res => {
        console.log(res.pokemon_species);
        return (res.pokemon_species);
    }).then(res => {
        title.innerHTML = "Choose you species";
        progress.innerHTML = '<div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>';
        for (let i = 0; i < res.length; i++) {
          species.innerHTML += `<button class= "species btn btn-warning m-1 btn-lg" data-url = "${res[i].url}">${res[i].name}</button><br>`;
        }
    });
    myShape = e.target.innerHTML;
    console.log(myShape);
}

species.addEventListener('click', getPokemons);

function getPokemons(e) {
    fetch(e.target.dataset.url).then(res => res.json()).then(res => {
        console.log(res.varieties);
        title.innerHTML = "Choose your Pokemon";
        progress.innerHTML = '<div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>';
        for (let i = 0; i < res.varieties.length; i++) {
          pokemons.innerHTML += `<button class= "pokemon btn btn-warning m-1 btn-lg" data-url = "${res.varieties[i].pokemon.url}">${res.varieties[i].pokemon.name}</button><br>`;
        }
        console.log(res.varieties[0].pokemon.name)
    });
    mySpecies = e.target.innerHTML;
    console.log(mySpecies);
}

pokemons.addEventListener('click', showViewCard);

function showViewCard(e) {
    title.innerHTML = "Pokemon - View card";
    progress.innerHTML = '<div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>';
    fetch(e.target.dataset.url).then(res => res.json()).then(res => res.sprites).then(res => {
        console.log(res.front_default);
        viewCard.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${res.front_default}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">My Pokemon - ${e.target.innerHTML}</h5>
        <p class="card-text">My shape: ${myShape} <br> My species: ${mySpecies}</p>
        <button id="close" class="btn btn-warning btn-lg m-1">Close the Modal</button>
        <button id="reset" class="btn btn-warning btn-lg m-1">Reset</button>
        </div>
        </div>`;
        console.log(e.target.innerHTML);
    });
}

viewCard.addEventListener('click', (e) => {
  if (e.target.innerHTML == "Close the Modal")
    viewCard.innerHTML = "";
  if (e.target.innerHTML == "Reset") {
    viewCard.innerHTML = "";
    pokemons.innerHTML = "";
    species.innerHTML = "";
    myShape = '';
    mySpecies = '';
  }
});



/*viewCard.innerHTML = `<div class="modal" tabindex="-1">
  <div class="modal-dialog">jjjj
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;*/