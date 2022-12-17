const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`/weather?cityName=` + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error //If error, render error
        } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
                search.value = ''
        } //If no error, render location and forecast
    })
})
})