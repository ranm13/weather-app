const tempManager = new TempManager()
const renderer = new Renderer

const loadPage =  async function(){
    let cityData =  await tempManager.getDataFromDB()
    renderer.render(cityData)
}

const handleSearch = async function(){
    let city = $("#city-input").val()
    $("#city-input").val(' ')
    if(city){
        await tempManager.getCityData(city)
        renderer.render(tempManager.cityData)
    }
}

const editCity =  async function(){
    let cityName = $(this).closest(".city").find(".city-name").text()
    let operation = $(this).attr('class')
    if(operation === "save-city"){
        tempManager.saveCity(cityName)
    }
    else if(operation === "remove-city"){
        tempManager.removeCity(cityName)
    }
    else if(operation === "refresh-button"){
        await tempManager.updateCity(cityName)
    }
    loadPage()
}

$("#city-container").on("click", ".save-city", editCity)
$("#city-container").on("click", ".remove-city", editCity)
$("#city-container").on("click", ".refresh-button", editCity)
loadPage()