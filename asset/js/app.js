
const app = {

    apiRootUrl: "https://pokebuildapi.fr/api/v1",

    init: ()  => {
        pokemon.init();
        type.init();
        filterPokemon.init();
        //generation.init();
    },

    /**
    * Créer et ajoute un element dans un container
    * @param {String} type le type de l'element html
    * @param {Element} parentElement element html où ajouter le nouveau element
    * @param {Object} options objet avec tout les attribut du futur element
    * @returns {Element} le nouveau element
    */
    drawElement(type, parentElement, options) {
        // creer un element du type donné en premier paramètre
        const element = document.createElement(type);

        // on ajoute tous les attributs de l'objet options à element grace à Object.assign
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        // on aurait aussi pu faire sans Object.assign, avec une boucle
        Object.assign(element, options);

        // l'ajouter dans le DOM dans le parentElement donné en paramètre
        parentElement.appendChild(element);

        // on renvoi l'element créé pour si jamais on a besoin de le recuperer en dehors de la fonction
        return element;
    }
}

document.addEventListener('DOMContentLoaded',app.init);