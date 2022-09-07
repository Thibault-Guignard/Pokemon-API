const filter = {
    
    init: function() {        
        filter.allSortingEventsInPage();
    },

    //création des evenements de filtre dans la page
    allSortingEventsInPage: function() {
        //evenement qui gere le choix d'un type dans le menu select
        const selectTypes = document.querySelector('.sort--type');
        selectTypes.addEventListener('change',filter.handleSelectPokemonByType);
        //bouton tous les pokemons
        const selectAllPokemon =document.querySelector('.barheader .navheader a')
        selectAllPokemon.addEventListener('click',filter.handleSelectAllPokemon);
    },

    //gestion du choix dans le menu select
    handleSelectPokemonByType: function(event) {
        //on recupere la valeur de l'option choisie qui est le nom de notre type
        const optionSelected = event.target.value;
        if (optionSelected != "Tri par type")  {
            filter.loadedPokemonByOneType(optionSelected);
        } else {
            filter.handleSelectAllPokemon();
        }
    },

    //click sur le bouton tous les pokemon
    handleClickTypePokemon: function(event) {
        const typeSelected = event.target.textContent;
        filter.loadedPokemonByOneType(typeSelected)
    },

    loadedPokemonByOneType: function(type_name) {

        filter.optionSelectedTypes(type_name)

        let fetchOptions = {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache'  
        };

        request = fetch(app.apiRootUrl + '/pokemon/type/'+ type_name, fetchOptions); 

        request.then(
            function(response) {
                return response.json();
            }
        )
        .then( // le deuxième .then() va nous permettre de faire quelque chose avec cette réponse
            function(jsonResponse) {
                //on envoie les données recues dans une fonction qui va créer le menu select dans la bar de nav
                filter.displayPokemonType(jsonResponse);
            }
        )       
    },

    displayPokemonType: function(listPokemonType) {
        filter.displayAllPokemon('none');
        const allPokemon =  document.querySelectorAll('.wrapper li');
        for(const onePokemon of allPokemon) {
            for (const onePokemonType of listPokemonType) {
                if(onePokemon.querySelector('span').textContent.includes(onePokemonType.name)) {
                    onePokemon.style.display ="block";
                }
            }            
        }
    },

    displayAllPokemon: function(choice) {
        const allPokemon =  document.querySelectorAll('.wrapper li');
        for(const onePokemon of allPokemon) {
            onePokemon.style.display = choice;
        }
    },


    handleSelectAllPokemon: function() {
        filter.displayAllPokemon('block');
        filter.optionSelectedTypes('Tri par type');
    },


    addOnePokemonEvent: function(oneTypePokemon) {
        oneTypePokemon.addEventListener('click',filter.handleClickTypePokemon)
    },

    optionSelectedTypes: function(type_name = 'Tri par type') {
        filter.eraseSelectedTypes();
        const selectTypes = document.querySelector('.sort--type');
        const optionTypes = selectTypes.querySelectorAll('option')
        for(const oneOption of optionTypes) {
            if (oneOption.value == type_name ) {
                oneOption.setAttribute('selected',true)
            }
        }
    },

    eraseSelectedTypes: function() {
        const selectTypes = document.querySelector('.sort--type');
        const optionTypes = selectTypes.querySelectorAll('option');
        for(const oneOption of optionTypes) {
                oneOption.removeAttribute('selected')
        }
    },
}