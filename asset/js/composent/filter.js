const filter = {
    
    init: function() {        
        filter.allSortingEventsInPage();
    },

    //création des evenements de filtre dans la page
    allSortingEventsInPage: function() {
        //evenement qui gere le choix d'un type dans le menu select type
        const selectTypes = document.querySelector('.sort--type');
        selectTypes.addEventListener('change',filter.handleSelectPokemonByFilter);
        //evenement qui gere le choix d'une génération dans le menu select génération
        const selectGenerations = document.querySelector('.sort--generation');
        selectGenerations.addEventListener('change',filter.handleSelectPokemonByFilter);
        //bouton tous les pokemons
        const selectAllPokemon =document.querySelector('.barheader .navheader a')
        selectAllPokemon.addEventListener('click',filter.handleSelectAllPokemon);
    },

    //click sur le bouton d'un type de pokemon
    addOnePokemonEventType: function(typeOfOnePokemon) {
        typeOfOnePokemon.addEventListener('click',filter.handleClickOnePokemonFilter)
    },
    
    //click sur le bouton de la génération d'un pokemon
    addOnePokemonEventGeneration: function(generationOfOnePokemon) {
        generationOfOnePokemon.addEventListener('click',filter.handleClickOnePokemonFilter)
    },

    handleClickOnePokemonFilter: function(event) {
        event.preventDefault();
        const targetFilter = event.currentTarget;
        !isNaN(targetFilter.dataset.generation) ? choiceSelected = targetFilter.dataset.generation : choiceSelected = targetFilter.textContent;
        filter.findTypeAndGeneration(choiceSelected);
    },

    handleSelectPokemonByFilter: function(event) {
        event.preventDefault();
        const choiceSelected = event.target.value;
        filter.findTypeAndGeneration(choiceSelected);
    },

    findTypeAndGeneration: function(choiceSelected) {
        filter.updateOptionSelected(choiceSelected);
        if (isNaN(choiceSelected)) {
            const generationSelect = document.querySelector('.sort--generation').querySelector('option[selected]');
            filter.displayPokemonSelected(choiceSelected, generationSelect.value)
        } else {
            const typeSelect = document.querySelector('.sort--type').querySelector('option[selected]');
            filter.displayPokemonSelected(typeSelect.value, choiceSelected)
        }
    },

    displayPokemonSelected: function(typeSelected, generationSelected) {
        filter.displayAllPokemon('none');
        const allPokemon = document.querySelectorAll('.wrapper li');
        for (const onePokemon of allPokemon) {
            const listTypesPokemon = onePokemon.querySelectorAll(".type__pokemon");
            const generationPokemon = onePokemon.querySelector(".generation").dataset.generation;
                for (const onePokemonType of listTypesPokemon) {
                    if ((typeSelected === onePokemonType.textContent || typeSelected === 'Tri par type') 
                        && (generationSelected === generationPokemon || generationSelected === '0')) {
                        onePokemon.style.display = 'block';
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

    handleSelectAllPokemon: function(event) {
        event.preventDefault();
        filter.displayAllPokemon('block');
        filter.updateOptionSelected('Tri par type');
        filter.updateOptionSelected(0);
    },

    //modification de la valeur par defaut dans le menu select aproprié
    updateOptionSelected: function(choiceSelected) {
        let menuSelected = ""
        isNaN(choiceSelected) ? menuSelected = "type" : menuSelected = "generation";
        const selectMenu = document.querySelector('.sort--' + menuSelected);
        selectMenu.querySelector('option[selected]').removeAttribute('selected');
        const optionTypes = selectMenu.querySelectorAll('option')
        for(const oneOption of optionTypes) {
            if (oneOption.value == choiceSelected ) {
                 oneOption.setAttribute('selected',true)
            }
        }
    },
}