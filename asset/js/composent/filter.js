const filter = {
    
    init: function() {        
        filter.allEventsInPage();
    },

    allEventsInPage: function() {
        //evenement qui gere le choix d'un type dans le menu select
        const selectTypes = document.querySelector('.sort--type');
        selectTypes.addEventListener('change',filter.handleSelectPokemonByType);
        //bouton tous les pokelons
        const selectAllPokemon =document.querySelector('.barheader .navheader a')
        selectAllPokemon.addEventListener('click',filter.handleSelectAllPokemon);
    },

    handleSelectPokemonByType: function(event) {
        //on recupere la valeur de l'option choisie qui est l'id de notre type
        const optionSelected = event.target.value;
        console.log(optionSelected);
        //on vérifier qu'on recoit bien un nombre et qu'il est différent de 0
        if (optionSelected != 0)  {
            filter.loadedPokemonByOneType(optionSelected);
        }
    },

    handleClickTypePokemon: function(event) {
        const typeSelected = event.target.textContent;
        filter.loadedPokemonByOneType(typeSelected)
    },

    loadedPokemonByOneType: function(type_name) {
        filter.optionSelectedTypes(type_name)
        console.log(type_name);
        // définir les options
        let fetchOptions = {
            method: 'GET', // La méthode HTTP (GET, POST, etc.)
            mode: 'cors',
            cache: 'no-cache'  
            // Si on veut envoyer des données avec la requête => décommenter et remplacer data par le tableau de données
            // , body : JSON.stringify(data)
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
        console.log(listPokemonType)  
        filter.displayAllPokemon('none');
        const allPokemon =  document.querySelectorAll('.wrapper li');
        for(const onePokemon of allPokemon) {
            for (const onePokemonType of listPokemonType) {
                if(onePokemon.querySelector('span').textContent == onePokemonType.name) {
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

    optionSelectedTypes: function(type_id = 'Tri par type') {
        filter.eraseSelectedTypes();
        const selectTypes = document.querySelector('.sort--type');
        const optionTypes = selectTypes.querySelectorAll('option')
        for(const oneOption of optionTypes) {
            if (oneOption.value == type_id ) {
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