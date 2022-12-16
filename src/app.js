const express = require('express')

const app = express()

app.get('', (req, res) => { //Customize what we're going to send back to the requester
    res.send('Hi express!')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})