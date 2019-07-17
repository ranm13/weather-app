class TempManager{
    constructor(){
        this.cityData =[]
    }

    getDataFromDB(){
        $.get('/cities', function(err, response){
            this.cityData = response
        })
    }

    async getCityData(cityName){
        let newCity = await $.get(`/city/${cityName}`)
        this.cityData.push({
            name: newCity.location.name,
            updatedAt: newCity.location.localtime,
            temperature: newCity.current.temp_c,
            condition: newCity.current.condition.text,
            conditionPic: newCity.current.condition.icon
        })
    }

    saveCity(cityName){
        for(let city of this.cityData){
            if(city.name === cityName){
                    $.post('/city', city, function(err, response){ return console.log("post completed")})
            }
        }
    }

    removeCity(cityName){
        $.ajax({
            method: "Delete",
            url: `/city/${cityName}`,
            success: () => console.log(cityName + " removed succesfuly")
          })
    }
}

