const express = require('express')
const path = require('path')
const hbs = require('hbs')
const GeoCode = require('./utils/geocode')
const Weather = require('./utils/weather')


const app = express()
const port = process.env.PORT || 3000  //env variable for heroku, 3000 for localhost
//console.log(path.join(__dirname,'./utils'))
// console.log(path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set-up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) =>{
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Jordi Pons'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
       title: 'About me',
       name: 'Jordi Pons' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'You must enter a city to get the weather forecast.',
        name: 'Jordi Pons'
    })
})

app.get('/weather', (req, res)=>{
    const {location} = req.query
    if(!location){
        return res.send({
            error: 'You must enter a location query.!'
        })
    }
    GeoCode(location, (error, data) =>{
        if(error){
            res.send({
                error: 'You must enter a valid location..!'
            })
        }else {
            latitut = data.latitude
            longitut = data.longitude
    
            Weather (latitut, longitut, (error, data)=>{
                if(error){
                    res.send({
                        error: 'Wrong Geo coordinates provided..!'
                    })
                }else {
                    const {temperature, humidity, feelslike, icon,pressure, cloudcover } = data
                    res.send({
                        address: location,
                        temperature: temperature,
                        humidity: humidity,
                        feelslike: feelslike,
                        icon: icon[0],
                        pressure: pressure,
                        cloudcover: cloudcover
                    })
                } 
            })
        }    
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Jordi Pons'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Jordi Pons'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ',port)
})