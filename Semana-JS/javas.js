
let pokeImg;
let pokeId1;
let pokeName1;
let pokeTypes;
let pokeHeight; 
let pokeWeight;
let pokeMoves;
let pokeStats;
let pokeName;

const loadPokemon = () => {
    document.getElementById('pokeImg').src = pokeImg;
    document.getElementById('pokeId1').innerHTML = '#'+pokeId1;
    document.getElementById('pokeName1').innerHTML = pokeName1;
    document.getElementById('pokeHeight').innerHTML = pokeHeight + " kg";
    document.getElementById('pokeWeight').innerHTML = "0. " + pokeWeight + " m";
    document.getElementById('pokeMoves').innerHTML = pokeMoves;

    getTypes();
    getStats();

    document.getElementById('pokeName').value='';
};

const getTypes = () => {
    let container = document.getElementById('pokeTypes');
    while (container.firstChild) {  
        container.removeChild(container.firstChild);  
    }  
    console.log(pokeTypes);

    pokeTypes.forEach(type => {
        var p = document.createElement("p");
        p.innerHTML = type.type.name;
        getColor(p);
        container.appendChild(p);
     
    });
}

const getColor = (element) => {
    element.classList.add('tag');
    switch(element.innerHTML){
        case 'bug':
        case 'grass':
            element.style.background = "lightgreen";
            break;
        case 'dark':
            element.style.background = "black";
            break;
        case 'dragon':
        case 'flying':
        case 'ice':
        case 'steel':
        case 'water':
            element.style.background = "lightblue";
            break;
        case 'electric':
            element.style.background = "yellow";
            break;
        case 'fairy':
        case 'psychic':
            element.style.background = "pink";
            break;
        case 'fighting':
        case 'fire':
            element.style.background = "orange";
            break;
        case 'ghost':
        case 'normal':
        case 'poison':
            element.style.background = "purple";
            break;
        case 'ground':
        case 'rock':
            element.style.background = "brown";
            break;
        default:
            element.style.background = "black";
            break;
    }
}

const getStats = () => {
    pokeStats.forEach(element => {
        console.log(element.stat.name)
        document.getElementById(`${element.stat.name}Value`).innerHTML = element.base_stat;
        document.getElementById(`${element.stat.name}Progress`).style.width = (element.base_stat > 100) ? '100%' : `${element.base_stat}%`;
    });
}

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokebola.PNG")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        console.log(data)
        pokeImg = data.sprites.other.home.front_default;
        pokeId1 = data.id;
        pokeName1 = data.name;
        pokeTypes = data.types;
        pokeHeight = data.height;
        pokeWeight = data.weight;
        pokeMoves = data.moves.length;
        pokeStats = data.stats;
        loadPokemon();
    });
};

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

