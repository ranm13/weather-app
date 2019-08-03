class Renderer {
    //Helper function that empties the html that we will render to and render to it using hendelbars
    renderHendelbar(templateId, objToTemplate, appendToPlace) {
        $(appendToPlace).empty()
        const source = $(templateId).html();
        const template = Handlebars.compile(source)
        const newHTML = template(objToTemplate);
        $(appendToPlace).append(newHTML);
    }

    render(allCityData){
        this.renderHendelbar("#city-template", {allCityData}, "#city-container" )
    }
}