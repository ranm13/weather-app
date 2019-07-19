class TempManager{
    constructor(){
        this.cityData =[]
    }

    async getDataFromDB(){
        let cityDataDB = await $.get('/cities')
        for(let city of cityDataDB){
            if((new Date()) - new Date(city.updatedAt) >= 10800000){
                this.updateCity(city.name)
            }
        }
        cityDataDB = await $.get('/cities')
        this.cityData = cityDataDB
        return this.cityData
    }


    async getCityData(cityName){
        let newCity = await $.get(`/city/${cityName}`)
        if(newCity){
            this.cityData.push(newCity)
        }
    }

    saveCity(cityName){
        for(let city of this.cityData){
            if(city.name === cityName){
                $.post('/city', city, function(response){return})
            }
        }
    }

    removeCity(cityName){
        $.ajax({
            method: "DELETE",
            url: `/city/${cityName}`,
            success: (response) => console.log(cityName + " removed succesfuly")
          })
    }

    async updateCity(cityName){
        await $.ajax({
            method: "PUT",
            url: `/city/${cityName}`,
            success: (response) => this.cityData = response
          })
          return this.cityData
    }
}

