/* Global Variables */
// API api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const API_KEY = '7b7e957ad672e94b7c96fd0394f598d4'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

// Get Action Button
document.getElementById('generate').addEventListener('click', async(e) => {
        e.preventDefault()
            // get user input values
        const ZIP_INPUT_VALUE = document.getElementById('zip').value
            // sample: api.openweathermap.org/data/2.5/weather?zip={zip-code}&appid={API key}
        const URL = `${BASE_URL}?zip=${ZIP_INPUT_VALUE}&appid=${API_KEY}`
        try {
            // Get Weather
            const { weather, main, name } = await getWeather(URL)
            toast(`The Weather at ${name} is ${weather[0].main}`)
                // send data to our server
            postData('/add', { weather, main, name }).then(({ message }) => {
                toast(`${message}`)
                    // update the UI
                updateUI()
            })
        } catch (error) {
            console.log(error.message)
            toast(`Error at zip code, may city not found`)
        }
    })
    /* Function to GET Web API Data*/
async function getWeather(URL) {
    const response = await fetch(URL)
    try {
        return await response.json()
    } catch (error) {
        console.log(error.message)
        toast(`Error at zip code, may city not found`)
    }
}
// post data to the server
async function postData(URL = '', data = {}) {
    // get feeling value
    const feelings = document.getElementById('feelings').value
        // Create a new date instance dynamically with JS
    let d = new Date()
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

    const payload = {
        date: newDate,
        weather: data.weather,
        main: data.main,
        name: data.name,
        content: feelings,
    }
    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    try {
        return await response.json()
    } catch (error) {
        console.log(error.message)
        toast(`Error at ${error.message}`)
    }
}

async function updateUI() {
    const request = await fetch('/all')
    try {
        const {
            message,
            data: {
                date,
                main: { temp },
                content,
            },
        } = await request.json()
        toast(`${message}`)
            // update new entry values
        document.getElementById('date').innerHTML = `Date: ${date}`
        document.getElementById('temp').innerHTML = `Temperature: ${temp}`
        document.getElementById('content').innerHTML = `Feelings: ${content}`
    } catch (error) {
        console.log(error.message)
        toast(`Error at ${error.message}`)
    }
}

// Helper Function
function toast(message) {
    Toastify({
        text: message,
        duration: 3000,
    }).showToast()
}