const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../models/City')
const moment = require('moment')
const apiUrl = `http://api.apixu.com/v1/current.json?key=92494961292b48baac484122191707&q=`

const updateCityObject = function(cityObject, cityData){
        cityObject.name = cityData.location.name
        cityObject.updatedAt = new Date()
        cityObject.temperature = cityData.current.temp_c
        cityObject.condition = cityData.current.condition.text
        cityObject.conditionPic = cityData.current.condition.icon
}

router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(apiUrl + cityName, function (err, response) {
        if (response.statusCode === 200) {
            let newCity = JSON.parse(response.body)
            let cityRequiredData = {}
            updateCityObject(cityRequiredData, newCity)
            res.send(cityRequiredData)
        }
        else {
            res.send(err)
        }
    })
})

router.get('/cities', function (req, res) {
    City.find({}).exec(function (err, cities) {
        let citiesToSend = cities
        citiesToSend.forEach(c => c.newFormatDate = (moment(c.updatedAt).format('LLL')))
        res.send(citiesToSend)
    })
})

router.post('/city', async function (req, res) {
    let city = req.body
    city.isSaved = true
    let newCity = new City(city)
    await newCity.save()
    res.end()
})

router.delete('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    City.findOneAndRemove({ name: cityName }, function () {
        res.end()
    })
})

router.put('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(apiUrl + cityName, function (err, response) {
        let cityUpdated = JSON.parse(response.body)
        City.findOne({ name: cityName }, async function (err, city) {
            updateCityObject(city, cityUpdated)
            await city.save()
            City.find({}).exec(function (err, cities) {
                res.send(cities)
            })
        })
    })
})

module.exports = router