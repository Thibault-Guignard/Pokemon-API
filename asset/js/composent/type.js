const type = {

    init : function () {
         type.loadedSelectType();
    },

    loadedSelectType: function() {
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'  
        };

        request = fetch(app.apiRootUrl + '/types', fetchOptions); 

        request.then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(jsonResponse) {
                type.createSelectTypeHeader(jsonResponse);
            }
        )       
    },

    createSelectTypeHeader: function(listType) {
        //tri par orde alphabetique en fonction du nom du type
        listType.sort((x,y) => x.name.localeCompare(y.name))
        //on recupere l'emplacement ou on va mettre notre select
        const selectTypes = document.querySelector('.sort--type');
        //on va créér les options
        const defaultOptionTri = type.createOption('Tri par type','Tri par type');
        defaultOptionTri.setAttribute('selected',true);
        selectTypes.append(defaultOptionTri);
        //ensuite ceux recuperer via Fetch 
        for( const oneType of listType ) {
            selectTypes.append(type.createOption(oneType.name,oneType.name))
        }
    },

    createOption : function(name, value) { 
        const option = document.createElement('option')
        option.value = value;
        option.text = name;
        return option;
    },
}