
const pokemon = {

    init : function() {
        pokemon.loadedPokemonInAPI();
    },

    loadedPokemon: function() {
        if ( null !== localStorage.getItem('pokemons')) {
           const listPokemon = JSON.parse(localStorage.getItem('pokemons'));
           pokemon.createUl(listPokemon);
        } else {
            pokemon.loadedPokemonInAPI();
        }
    },

    loadedPokemonInAPI : function() {

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
                pokemon.createUl(jsonResponse);
            }
        )
    },

    createUl: function(pokemonList) {
        //sauvegarde
        //pokemon.saveInLocalStorage(pokemonList)
        //on crée le ul parent a qui on va mettre la classe wrapper
        const ulListPokemon = document.createElement('ul');
        //on rajoute la class wrapper a cet Ul
        ulListPokemon.classList.add('wrapper');
        for (const onePokemon of pokemonList) {
            const template = document.getElementById('template_pokemon');
            const pokemonFragment = template.content.cloneNode(true);
            pokemon.createPokemonImage(pokemonFragment, onePokemon);
            pokemon.createPokemonName(pokemonFragment, onePokemon);
            pokemon.createPokemonType(pokemonFragment, onePokemon);
            ulListPokemon.append(pokemonFragment);            
        }
        const divParent = document.getElementById('display-all-pokemon')
        divParent.append(ulListPokemon);

    },

    createPokemonImage: function(pokemonFragment, onePokemon) {
        const img = pokemonFragment.querySelector('img');
        img.src = onePokemon.image;
        img.name = onePokemon.name;
    },

    createPokemonName: function(pokemonFragment, onePokemon) {
        const span = pokemonFragment.querySelector('span');
        span.textContent = onePokemon.pokedexId + '. ' + onePokemon.name;
    },

    createPokemonType: function(pokemonFragment , onePokemon) {
        //on recupere la div dans laquelle on va mettre les types
        const divType = pokemonFragment.querySelector('.list__type')
        //on boucle sur les types d'un pokemon donné
        for(const listType of onePokemon.apiTypes) {
            //on crée notre nouvel element a 
            const newTypeFragementPokemon = document.createElement('a');
            //on lui rajoute en ref l'id du type
            newTypeFragementPokemon.href = "#";
            //on ajoute la classe pour gere le CSS
            const typesPokemon = ['type__pokemon','type__pokemon--' + listType.name];
            newTypeFragementPokemon.classList.add(...typesPokemon);
            //on lui donne en valeur le nom du type
            newTypeFragementPokemon.textContent = listType.name;
            //on lui rajoute un evenement
            filter.addOnePokemonEvent(newTypeFragementPokemon);
            //on le place dans la div
            divType.append(newTypeFragementPokemon);
        }
        
    },

    saveInLocalStorage: function(listPokemon) {
        localStorage.setItem("pokemons",JSON.stringify(listPokemon));
    }
}