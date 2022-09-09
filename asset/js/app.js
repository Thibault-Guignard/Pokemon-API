
const app = {

    apiRootUrl: "https://pokebuildapi.fr/api/v1",

    init: function() {
        pokemon.init();
        type.init();
        filter.init();
        //generation.init();
    },
}

document.addEventListener('DOMContentLoaded',app.init);