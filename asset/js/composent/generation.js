const generation = {

    init: function() {

    },

    createSelectGenerationHeader: function() {
        const numberOfGeneration = generation.findGenerationOfLastPokemon();
        //on recupere l'emplacement ou on va mettre notre select
        const selectGenerations = document.querySelector('.sort--generation');
        //on va créér les options
        //option par défaut
        const defaultOptionTri = type.createOption('Tri par generation', 0);
        defaultOptionTri.setAttribute('selected',true);
        selectGenerations.append(defaultOptionTri);
        //autres options
        for (let g = 1; g <= numberOfGeneration; g++) {
            selectGenerations.append(type.createOption(g + '° Génération',g))
        }
    },

    findGenerationOfLastPokemon: function() {
        const lastPokemon = document.querySelector('.wrapper>li:last-child');
        return lastPokemon.querySelector(".generation").dataset.generation;
    },

}