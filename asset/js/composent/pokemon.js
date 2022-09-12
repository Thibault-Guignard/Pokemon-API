const pokemon = {

    init : () => {
        pokemon.loadedPokemonInAPI();
    },

    loadedPokemonInAPI: () => {
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'  
        };
        request = fetch(`${app.apiRootUrl}/pokemon`, fetchOptions); 
        request.then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(jsonResponse) {
                pokemon.createUl(jsonResponse);
            }
        )
    },

    createUl: (pokemonList) => {
        //on crée le ul parent a qui on va mettre la classe wrapper
        const ulListPokemon = document.createElement('ul');
        //on rajoute la class wrapper a cet Ul
        ulListPokemon.classList.add('wrapper');

        pokemonList.forEach( onePokemon => {
            const template = document.getElementById('template_pokemon');
            const pokemonFragment = template.content.cloneNode(true);
            pokemon.createPokemonImage(pokemonFragment, onePokemon);
            pokemon.createPokemonName(pokemonFragment, onePokemon);
            pokemon.createPokemonType(pokemonFragment, onePokemon);
            pokemon.createPokemonGenaration(pokemonFragment, onePokemon);
            ulListPokemon.append(pokemonFragment);  
        });

        const divParent = document.getElementById('display-all-pokemon')
        divParent.append(ulListPokemon);

        //on va maintenant créer le select des générations
        generation.createSelectGenerationHeader();
    },

    createPokemonImage: (pokemonFragment, onePokemon) => {
        const img = pokemonFragment.querySelector('img');
        img.src = onePokemon.image;
        img.name = onePokemon.name;
    },

    createPokemonName: (pokemonFragment, onePokemon) => {
        const span = pokemonFragment.querySelector('span');
        span.textContent = `${onePokemon.pokedexId}. ${onePokemon.name}`;
    },

    createPokemonType: (pokemonFragment , onePokemon) => {
        //on recupere la div dans laquelle on va mettre les types
        const divType = pokemonFragment.querySelector('.list__type');
        //on boucle sur les types d'un pokemon donné
        onePokemon.apiTypes.forEach(listType => {
            //on crée notre nouvel element a 
            const newTypeFragementPokemon = document.createElement('a');
            //on lui rajoute en ref l'id du type
            newTypeFragementPokemon.href = "";
            //on ajoute la classe pour gere le CSS
            const typesPokemon = [`type__pokemon`,`type__pokemon--${listType.name}`];
            newTypeFragementPokemon.classList.add(...typesPokemon);
            //on lui donne en valeur le nom du type
            newTypeFragementPokemon.textContent = listType.name;
            //on lui rajoute un evenement
            filter.addOnePokemonEventType(newTypeFragementPokemon);
            //on le place dans la div
            divType.append(newTypeFragementPokemon);
        });
    },

    createPokemonGenaration: (pokemonFragment, onePokemon) => {
        //on recupere le a dans laquelle on va préciser la genération du pokemon
        const aGeneration = pokemonFragment.querySelector('.generation');
        aGeneration.textContent = `${onePokemon.apiGeneration}° Génération`
        aGeneration.dataset.generation = onePokemon.apiGeneration;
        filter.addOnePokemonEventGeneration(aGeneration);
    },
}