const express = require( 'express' )
const router = express.Router()
const request = require('request')
const City = require('../models/City')

router.get('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    request(`http://api.apixu.com/v1/current.json?key=92494961292b48baac484122191707&q=${cityName}`, function(err, response){
        res.send(JSON.parse(response.body))
    })
})

router.get('/cities', function(req, res){
    City.find({}).exec(function(err, cities){
        res.send(cities)
    })
})

router.post('/city', function(req, res){
    let city = req.body
    let newCity = new City({
        name: city.name,
        updatedAt: city.updatedAt,
        temperature: city.temperature,
        condition: city.condition,
        conditionPic: city.conditionPic
    })
    newCity.save().then(function(newCity){
        console.log(`The city ${newCity.name} has been saved in DB`)
    })
    res.end()
})

router.delete('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    City.findOneAndRemove({name: cityName}, function(err, city){
        console.log(city)
        res.end()
    })
})

module.exports = router
