const path = require ('path')
const express = require('express')
const hbs = require('hbs')



const app = express()



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
    res.send({
        forecast : 'Moderate Breeze',
        location : 'Sorsogon'
    })
}) //Setup weather route to send back to JSON



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


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})