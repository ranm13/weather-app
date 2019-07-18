const express = require( 'express' )
const router = express.Router()
const request = require('request')
const City = require('../models/City')
const moment = require('moment')


router.get('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    request(`http://api.apixu.com/v1/current.json?key=92494961292b48baac484122191707&q=${cityName}`, function(err, response){
        if(response.statusCode === 200){
            let newCity = JSON.parse(response.body)
            let cityRequiredData = {
            name: newCity.location.name,
            updatedAt: new Date(),
            temperature: newCity.current.temp_c,
            condition: newCity.current.condition.text,
            conditionPic: newCity.current.condition.icon,
        }
            res.send(cityRequiredData)
        }
        else{
            res.send(err)
        }
    })
})

router.get('/cities', function(req, res){
    City.find({}).exec(function(err, cities){
        let citiesToSend = cities
        citiesToSend.forEach(c => c.newFormatDate = (moment(c.updatedAt).format('LLL')))
        console.log(citiesToSend)
        res.send(citiesToSend)
    })
})

router.post('/city', function(req, res){
    let city = req.body
    city.isSaved = true
    let newCity = new City(city)
    newCity.save().then(function(newCity){
        console.log(`The city ${newCity.name} has been saved in DB`)
    })
    res.end()
})

router.delete('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    City.findOneAndRemove({name: cityName}, function(err, city){
        res.end()
    })
})

router.put('/city/:cityName', function(req, res){
    let cityName = req.params.cityName
    request(`http://api.apixu.com/v1/current.json?key=92494961292b48baac484122191707&q=${cityName}`, function(err, response){
        let cityUpdated = JSON.parse(response.body)
        City.findOne({name: cityName}, function(err, city){
            city.updatedAt = moment().format()
            city.temperature = cityUpdated.current.temp_c
            city.condition = cityUpdated.current.condition.text
            city.conditionPic = cityUpdated.current.condition.icon
            city.save().then(function(city){
                console.log(`The city ${city.name} has been updated`)
                City.find({}).exec(function(err, cities){
                    res.send(cities)
                })
            })
            
        })
    })
})

module.exports = router
