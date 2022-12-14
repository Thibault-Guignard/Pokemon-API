const type = {

    init: () => {
        type.loadedSelectType();
    },

    loadedSelectType: () => {
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'  
        };
        request = fetch(`${app.apiRootUrl}/types`, fetchOptions); 
        request.then(
            response => {
                return response.json();
            }
        )
        .then(
            jsonResponse => {
                type.createSelectTypeHeader(jsonResponse);
            }
        )       
    },

    createSelectTypeHeader: listType => {
        //tri par orde alphabetique en fonction du nom du type
        listType.sort((x,y) => x.name.localeCompare(y.name))
        //on recupere l'emplacement ou on va mettre notre select
        const selectTypes = document.querySelector('.sort--type');
        //on va créér les options
        const defaultOptionTri = type.createOption('Tri par type','Tri par type');
        defaultOptionTri.setAttribute('selected',true);
        selectTypes.append(defaultOptionTri);
        //ensuite ceux recuperer via Fetch 
        listType.forEach(oneType => {
            selectTypes.append(type.createOption(oneType.name,oneType.name));
        });
    },

    createOption: (name, value) => { 
        const option = document.createElement('option')
        option.value = value;
        option.text = name;
        return option;
    },
}