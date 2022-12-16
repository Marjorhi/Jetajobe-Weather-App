const express = require('express')

const app = express()

//app.com
app.get('', (req, res) => { //Customize what we're going to send back to the requester
    res.send('Hi express!')
})

//app.com/help
app.get('/help', (req, res) => {
    res.send('Help page')
})

//app.com/about
app.get('/about', (req, res) => {
    res.send('About')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})