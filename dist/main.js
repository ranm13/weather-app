const tempManager = new TempManager()
const renderer = new Renderer

const loadPage =  async function(){
    let cityData =  await tempManager.getDataFromDB()
    renderer.render(cityData)
}

const handleSearch = async function(){
    let city = $("#city-input").val()
    if(city){
        let getCity = await tempManager.getCityData(city)
        renderer.render(tempManager.cityData)
    }

}

const saveCity = function(){
    let cityName = $(this).closest(".city").find(".city-name").text()
    tempManager.saveCity(cityName)
    loadPage()
}

const removeCity = function(){
    let cityName = $(this).closest(".city").find(".city-name").text()
    tempManager.removeCity(cityName)
    loadPage()
}

const updateCityData = async function(){
    let cityName = $(this).closest(".city").find(".city-name").text()
    let updatedData = await tempManager.updateCity(cityName)
    loadPage()
}

$("#city-container").on("click", ".save-city", saveCity)
$("#city-container").on("click", ".remove-city", removeCity)
$("#city-container").on("click", ".refresh-button", updateCityData)
loadPage()