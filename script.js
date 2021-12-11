const pokedex = document.getElementById('pokemonlist');
const cachedPokemon = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
            1}.png`
    }));

    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) =>
            `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </a>
    </li>
        `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        cachedPokemon[id] = pokeman;
        displayPokemanPopup(pokeman);
    } else {
        displayPokemanPopup(cachedPokemon[id]);
    }
};

const displayPokemanPopup = (pokeman) => {
    console.log(pokeman);
    const ability = pokeman.abilities.map((abilities) => abilities.ability.name).join(', ');
    const move = pokeman.moves.map((moves) => moves.move.name).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="card">
                <img class="card-image" src="${
                    pokeman.sprites['front_default']
                }"/>
                <h2 class="card-title">${pokeman.name}</h2>
                <p><b>Abilities:</b> ${ability} </p> 
                <p><b>Moves:</b> ${move} </p>
                <p><b>Weight:</b> ${pokeman.weight}</p>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();
