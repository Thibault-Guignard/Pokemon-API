const pokemon = {

    init : () => {
        pokemon.loadedPokemonInAPI();
        pokemon.displayPokemon = document.querySelector('#display-all-pokemon');
    },

    loadedPokemonInAPI: () => {
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'  
        };
        request = fetch(`${app.apiRootUrl}/pokemon`, fetchOptions); 
        request.then(
            response => {
                return response.json();
            }
        )
        .then(
            jsonResponse => {
                pokemon.createListPokemon(jsonResponse);
            }
        )
    },

    createListPokemon: pokemonList => {
        const ulListPokemon = app.drawElement('ul',pokemon.displayPokemon,{
            className: "wrapper"
        });

        pokemonList.forEach( onePokemon => {
            const liOnePokemon = app.drawElement('li',ulListPokemon,{
                className: "pokemon"
            });
            const aPokemon = app.drawElement('a',liOnePokemon,{
                className: "pokemon__info",
                href:"#"
            });
            app.drawElement('img',aPokemon,{
                src: onePokemon.image,
                alt: onePokemon.name
            })
            //pokemon.createPokemonImage(pokemonFragment, onePokemon);
            app.drawElement('span',aPokemon,{
                className: "name",
                textContent: `${onePokemon.pokedexId}. ${onePokemon.name}`
            })
            //pokemon.createPokemonName(pokemonFragment, onePokemon);
            const divPokemonDetail = app.drawElement('div',liOnePokemon,{
                className: "pokemon__detail"
            });
            const pokemonGeneration = app.drawElement('a',divPokemonDetail,{
                className: "generation",
                textContent: `${onePokemon.apiGeneration}° Génération`,
                href: "#",
                //dataset: {generation : onePokemon.apiGeneration},
            });
            pokemonGeneration.dataset.generation = onePokemon.apiGeneration;
            filterPokemon.addOnePokemonEventGeneration(pokemonGeneration);

            //pokemon.createPokemonGenaration(pokemonFragment, onePokemon);
            const divPokemonTypes = app.drawElement('div',divPokemonDetail,{className: "list__type"})
            onePokemon.apiTypes.forEach(listType => { 
                const oneType = app.drawElement('a',divPokemonTypes, {
                className: `type__pokemon type__pokemon--${listType.name}`,
                href: "#",
                textContent: listType.name
                })
                filterPokemon.addOnePokemonEventType(oneType);
            });

        });

        //on va maintenant créer le select des générations
        generation.createSelectGenerationHeader();
    },

    // createPokemonImage: (pokemonFragment, onePokemon) => {
    //     const img = pokemonFragment.querySelector('img');
    //     img.src = onePokemon.image;
    //     img.alt = onePokemon.name;
    // },

    // createPokemonName: (pokemonFragment, onePokemon) => {
    //     const span = pokemonFragment.querySelector('span');
    //     span.textContent = `${onePokemon.pokedexId}. ${onePokemon.name}`;
    // },

    // createPokemonType: (pokemonFragment , onePokemon) => {
    //     //on recupere la div dans laquelle on va mettre les types
    //     const divType = pokemonFragment.querySelector('.list__type');
    //     //on boucle sur les types d'un pokemon donné
    //     onePokemon.apiTypes.forEach(listType => {
    //         //on crée notre nouvel element a 
    //         const newTypeFragementPokemon = document.createElement('a');
    //         //on lui rajoute en ref l'id du type
    //         newTypeFragementPokemon.href = "";
    //         //on ajoute la classe pour gere le CSS
    //         const typesPokemon = [`type__pokemon`,`type__pokemon--${listType.name}`];
    //         newTypeFragementPokemon.classList.add(...typesPokemon);
    //         //on lui donne en valeur le nom du type
    //         newTypeFragementPokemon.textContent = listType.name;
    //         //on lui rajoute un evenement
    //         filterPokemon.addOnePokemonEventType(newTypeFragementPokemon);
    //         //on le place dans la div
    //         divType.append(newTypeFragementPokemon);
    //     });
    // },

    // createPokemonGenaration: (pokemonFragment, onePokemon) => {
    //     //on recupere le a dans laquelle on va préciser la genération du pokemon
    //     const aGeneration = pokemonFragment.querySelector('.generation');
    //     aGeneration.textContent = `${onePokemon.apiGeneration}° Génération`
    //     aGeneration.dataset.generation = onePokemon.apiGeneration;
    //     filterPokemon.addOnePokemonEventGeneration(aGeneration);
    // },
}