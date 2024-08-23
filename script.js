const pokemonCards = document.querySelectorAll('.card');
const randomButton = document.getElementById('random-button');


async function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${randomId}/`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function getPokemonGeneration(id) {
    if (id <= 151) return '1ª Geração';
    if (id <= 251) return '2ª Geração';
    if (id <= 386) return '3ª Geração';
    if (id <= 493) return '4ª Geração';
    if (id <= 649) return '5ª Geração';
    if (id <= 721) return '6ª Geração';
    if (id <= 809) return '7ª Geração';
    return '8ª Geração'; 
}

function getTypeClass(type) {
    const typeClasses = {
        fire: 'fire',
        water: 'water',
        grass: 'grass',
        electric: 'electric',
        ice: 'ice',
        fighting: 'fighting',
        poison: 'poison',
        ground: 'ground',
        flying: 'flying',
        psychic: 'psychic',
        bug: 'bug',
        rock: 'rock',
        ghost: 'ghost',
        dragon: 'dragon',
        dark: 'dark',
        steel: 'steel',
        fairy: 'fairy'
    };
    return typeClasses[type] || 'default'; 
}

function updateCard(card, pokemon) {
    const pokemonId = card.querySelector('.pokemon-id');
    const pokemonName = card.querySelector('.pokemon-name');
    const pokemonImage = card.querySelector('.pokemon-image');
    const pokemonTypes = card.querySelector('.pokemon-types');
    const pokemonMoves = card.querySelector('.pokemon-moves');
    const pokemonGeneration = card.querySelector('.pokemon-generation');

    pokemonId.textContent = `#${pokemon.id}`;
    pokemonName.textContent = capitalizeFirstLetter(pokemon.name); 
    pokemonImage.src = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
    pokemonImage.alt = pokemon.name;

    pokemonTypes.innerHTML = pokemon.types.map(type => `
        <li>
            <button class="pokemon-type-button ${getTypeClass(type.type.name)}">${capitalizeFirstLetter(type.type.name)}</button>
        </li>
    `).join('');

    const moves = pokemon.moves.slice(0, 2).map(move => capitalizeFirstLetter(move.move.name)).join(', ');
    pokemonMoves.textContent = `Movimentos: ${moves}`;

    const generation = getPokemonGeneration(pokemon.id);
    pokemonGeneration.textContent = `Geração: ${generation}`;
}

async function generateRandomPokemons() {
    for (let i = 0; i < pokemonCards.length; i++) {
        const pokemon = await getRandomPokemon();
        updateCard(pokemonCards[i], pokemon);
    }
}

randomButton.addEventListener('click', generateRandomPokemons);

window.onload = generateRandomPokemons;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
