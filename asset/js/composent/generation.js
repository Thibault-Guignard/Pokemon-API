const generation = {

    init: () => {

    },

    createSelectGenerationHeader: () => {
        const numberOfGeneration = generation.findGenerationOfLastPokemon();
        //on recupere l'emplacement ou on va mettre notre select
        const selectGenerations = document.querySelector('.sort--generation');
        //on va créér les options
        //option par défaut
        const defaultOptionTri = type.createOption('Tri par génération', 0);
        defaultOptionTri.setAttribute('selected',true);
        selectGenerations.append(defaultOptionTri);
        //autres options
        for (let g = 1; g <= numberOfGeneration; g++) {
            selectGenerations.append(type.createOption(`${g}° Génération`,g))
        }
    },

    findGenerationOfLastPokemon: () => {
        const lastPokemon = document.querySelector('.wrapper>li:last-child');
        return lastPokemon.querySelector(".generation").dataset.generation;
    },

}