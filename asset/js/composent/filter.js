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

    addOnePokemonEventType: function(oneTypePokemon) {
        oneTypePokemon.addEventListener('click',filter.handleClickOnePokemonType)
    },
    
    addOnePokemonEventGeneration: function(oneTypePokemon) {
        oneTypePokemon.addEventListener('click',filter.handleClickOnePokemonGeneration)
    },

    handleClickOnePokemonType: function(event) {
        event.preventDefault();
        const choiceSelected = event.target.textContent;
        filter.findTypeAndGeneration(choiceSelected);
    },

    handleClickOnePokemonGeneration: function(event) {
        event.preventDefault();
        const choiceSelected = event.target.dataset.generation;
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
        console.log(typeSelected, generationSelected);
        filter.displayAllPokemon('none');
        

    },


    displayPokemonForOneType: function(optionSelected) {

        console.log(optionSelected)
        const allPokemon =  document.querySelectorAll('.wrapper li');
        for(const onePokemon of allPokemon) {
            const listTypesPokemon = onePokemon.querySelectorAll(".type__pokemon");
            console.log(listTypesPokemon);
            for (const onePokemonType of listTypesPokemon) {
                if(onePokemonType.textContent.includes(optionSelected)) {
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


    handleSelectAllPokemon: function(event) {
        event.preventDefault();
        filter.displayAllPokemon('block');
        filter.optionSelectedTypes('Tri par type');
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