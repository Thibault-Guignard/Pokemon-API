const filterPokemon = {
    
    init: () => {        
        filterPokemon.allSortingEventsInPage();
    },

    //création des evenements de filtre dans la page
    allSortingEventsInPage: () => {
        //evenement qui gere le choix d'un type dans le menu select type
        const selectTypes = document.querySelector('.sort--type');
        selectTypes.addEventListener('change',filterPokemon.handleSelectPokemonByFilter);
        //evenement qui gere le choix d'une génération dans le menu select génération
        const selectGenerations = document.querySelector('.sort--generation');
        selectGenerations.addEventListener('change',filterPokemon.handleSelectPokemonByFilter);
        //bouton tous les pokemons
        const selectAllPokemon =document.querySelector('.barheader .navheader a')
        selectAllPokemon.addEventListener('click',filterPokemon.handleSelectAllPokemon);
    },

    //click sur le bouton d'un type de pokemon
    addOnePokemonEventType: typeOfOnePokemon => {
        typeOfOnePokemon.addEventListener('click',filterPokemon.handleClickOnePokemonFilter)
    },
    
    //click sur le bouton de la génération d'un pokemon
    addOnePokemonEventGeneration: generationOfOnePokemon => {
        generationOfOnePokemon.addEventListener('click',filterPokemon.handleClickOnePokemonFilter)
    },

    handleClickOnePokemonFilter: event => {
        event.preventDefault();
        const targetFilter = event.currentTarget;
        !isNaN(targetFilter.dataset.generation) ? choiceSelected = targetFilter.dataset.generation : choiceSelected = targetFilter.textContent;
        filterPokemon.findTypeAndGeneration(choiceSelected);
    },

    handleSelectPokemonByFilter: event => {
        event.preventDefault();
        const choiceSelected = event.target.value;
        console.log(choiceSelected)
        filterPokemon.findTypeAndGeneration(choiceSelected);
    },

    findTypeAndGeneration: choiceSelected => {
        filterPokemon.updateOptionSelected(choiceSelected);
        if (isNaN(choiceSelected)) {
            const generationSelect = document.querySelector('.sort--generation').querySelector('option[selected]');
            filterPokemon.displayPokemonSelected(choiceSelected, generationSelect.value)
        } else {
            const typeSelect = document.querySelector('.sort--type').querySelector('option[selected]');
            filterPokemon.displayPokemonSelected(typeSelect.value, choiceSelected)
        }
    },

    displayPokemonSelected: (typeSelected, generationSelected) => {
        filterPokemon.displayAllPokemon('none');
        const allPokemon = document.querySelectorAll('.wrapper li');

        allPokemon.forEach(onePokemon => {
            const listTypesPokemon = onePokemon.querySelectorAll(".type__pokemon");
            const generationPokemon = onePokemon.querySelector(".generation").dataset.generation;
                listTypesPokemon.forEach(onePokemonType => {
                    if ((typeSelected === onePokemonType.textContent || typeSelected === 'Tri par type') 
                    && (generationSelected === generationPokemon || generationSelected === '0')) {
                    onePokemon.style.display = 'block';
                }
                });     
        });

    },

    displayAllPokemon: choice => {
        const allPokemon =  document.querySelectorAll('.wrapper li');
        for(const onePokemon of allPokemon) {
            onePokemon.style.display = choice;
        }
    },

    handleSelectAllPokemon: event =>  {
        event.preventDefault();
        filterPokemon.displayAllPokemon('block');
        filterPokemon.updateOptionSelected('Tri par type');
        filterPokemon.updateOptionSelected(0);
    },

    //modification de la valeur par defaut dans le menu select aproprié
    updateOptionSelected: choiceSelected => {
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