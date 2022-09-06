const type = {

    init : function () {
         type.loadedSelectType();

    },

    loadedSelectType: function() {
        // définir les options
        let fetchOptions = {
            method: 'GET', // La méthode HTTP (GET, POST, etc.)
            mode: 'cors',
            cache: 'no-cache'  
            // Si on veut envoyer des données avec la requête => décommenter et remplacer data par le tableau de données
            // , body : JSON.stringify(data)
        };

        request = fetch(app.apiRootUrl + '/types', fetchOptions); 

        request.then(
            function(response) {
                return response.json();
            }
        )
        .then( // le deuxième .then() va nous permettre de faire quelque chose avec cette réponse
            function(jsonResponse) {
                //on envoie les données recues dans une fonction qui va créer le menu select dans la bar de nav
                type.createSelectTypeHeader(jsonResponse);
            }
        )       
    },

    createSelectTypeHeader: function(listType) {
        //on recupere l'emplacement ou on va mettre notre select
        const selectTypes = document.querySelector('.sort--type');
        //on va créér les options
        //d'abord la basisque
        selectTypes.append(type.createOption('Tri par type'));
        //ensuite ceux recuperer via Fetch 
        for( const oneType of listType ) {
            selectTypes.append(type.createOption(oneType.name,oneType.id))
        }
    },

    createOption : function(name , id = 0) { 
        const option = document.createElement('option')
        option.value = name;
        option.text = name;;
        return option;
    } ,
}