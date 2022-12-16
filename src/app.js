const path = require ('path')
const express = require('express')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public') //Generate path to public folder


app.use(express.static(publicDirectoryPath)) //Passing public directory path to the static function


//app.com
app.get('', (req, res) => { //Customize what we're going to send back to the requester
    res.send('<h1>Weather</h1>')
})

//app.com/help
app.get('/help', (req, res) => {
    res.send([{
        name : 'Marjorie Jetajobe'
    },{
        name : 'Solon'
    }])
})

//app.com/about
app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

//app.com/weather
app.get('/weather', (req, res) => {
    res.send({
        forecast : 'Moderate Breeze',
        location : 'Sorsogon'
    })
}) //Setup weather route to send back to JSON


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})