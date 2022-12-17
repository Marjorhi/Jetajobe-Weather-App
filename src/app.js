const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //Generate path to public folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)//Contains the path that the handlebars module need


// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //Passing public directory path to the static function


// //app.com
// app.get('', (req, res) => { //Customize what we're going to send back to the requester
//     res.send('<h1>Weather</h1>')
// })

// //app.com/help
// app.get('/help', (req, res) => {
//     res.send([{
//         name : 'Marjorie Jetajobe'
//     },{
//         name : 'Solon'
//     }])
// })

// //app.com/about
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })


// http://localhost:3000/
app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Marjorie Flores Jetajobe'
    }) //Rendering dynamic content from index.hbs
})


//http://localhost:3000/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Marjorie Flores Jetajobe'
    })
})


//http://localhost:3000/help
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helpful text!',
        title: 'Weather App Help',
        name: 'Marjorie Flores Jetajobe'
    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.cityName) { //Sending back an error message when no cityName is provided
        return res.send({
            error: 'You must provide an cityName!'
        })
    }

    //Using the cityName to geoCode
    geoCode(req.query.cityName, (error, { longitude, latitude, location } = { }) => {
        if (error) {
            return res.send({ error })
        } 

        //Using the coordinates to get forecast
        forecast( longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
        res.send({
        forecast : forecastData,
        location,
        cityName: req.query.cityName //Add cityName property onto JSON which returns the provided cityName
             })
        })
    })
}) //Setup weather route to send back to JSON


app.get('/products', (req, res) => { // When there is no search term
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term' //Setting up an error message with feedback
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marjorie Flores Jetajobe',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marjorie Flores Jetajobe',
        errorMessage: '404! Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})