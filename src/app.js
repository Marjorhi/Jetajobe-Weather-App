const express = require('express')

const app = express()

//app.com
app.get('', (req, res) => { //Customize what we're going to send back to the requester
    res.send('<h1>Weather</h1>')
})

//app.com/help
app.get('/help', (req, res) => {
    res.send({
        name: 'Marjorie Jetajobe',
        age : 20
    })
})

//app.com/about
app.get('/about', (req, res) => {
    res.send('About')
})

//app.com/weather
app.get('/weather', (req, res) => {
    res.send('Weather')
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})