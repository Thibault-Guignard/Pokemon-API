
const app = {

    apiRootUrl: "https://pokebuildapi.fr/api/v1",

    init: function() {
        pokemon.init();
        type.init();
        filter.init();

    },

    loadedPokemon : function() {
        // définir les options
        let fetchOptions = {
            method: 'GET', // La méthode HTTP (GET, POST, etc.)
            mode: 'cors',
            cache: 'no-cache'  
            // Si on veut envoyer des données avec la requête => décommenter et remplacer data par le tableau de données
            // , body : JSON.stringify(data)
        };

        request = fetch(app.apiRootUrl + '/pokemon', fetchOptions); 

        request.then(
            function(response) {
                return response.json();
            }
        )
        .then( // le deuxième .then() va nous permettre de faire quelque chose avec cette réponse
            function(jsonResponse) {
                console.log(jsonResponse)
                app.createUl(jsonResponse);
            }
        )
    },

    createUl: function(pokemonList) {
        //on crée le ul parent a qui on va mettre la classe wrapper
        const ulListPokemon = document.createElement('ul');
        //on rajoute la class wrapper a cet Ul
        ulListPokemon.classList.add('wrapper');
        for (const pokemon of pokemonList) {
            const template = document.getElementById('template_pokemon');
            const pokemonFragment = template.content.cloneNode(true);
            app.updatePokemonImage(pokemonFragment,pokemon);
            app.updatePokemonSpan(pokemonFragment, pokemon);         
            
            ulListPokemon.append(pokemonFragment);            
        }
        //console.log(ulListPokemon);
        const divParent = document.getElementById('display-all-pokemon')
        divParent.append(ulListPokemon);

    },

    updatePokemonSpan: function(pokemonFragment, pokemon) {
        //on recupere le span dans le template
        const span = pokemonFragment.querySelector('span');
        //on lui donne la valeur nom du pokemon
        span.textContent = pokemon.name;
        //console.log(span);
    },

    updatePokemonImage: function(pokemonFragment , pokemon) {
        //on recupere l'image dans la template
        const img = pokemonFragment.querySelector('img');
        //on lui donne la source
        img.src = "./img/"+ pokemon.number +".png";
        //on lui donne l'attribut
        img.alt = pokemon.name;
        //console.log(img);
    },
}

document.addEventListener('DOMContentLoaded',app.init);