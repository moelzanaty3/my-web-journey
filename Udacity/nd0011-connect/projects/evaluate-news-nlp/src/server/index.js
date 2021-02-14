const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist'))

const BASE_URL = 'https://api.meaningcloud.com/sentiment-2.1'
const API_KEY = process.env.MEANING_CLOUD_API_KEY

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/add-url', async (req, res) => {
  /* TODO:
      1. GET the url from the request body
      2. Build the URL
      3. Fetch Data from API
      4. Send it to the client
      5. REMOVE THIS TODO AFTER DOING IT 😎😎
      server sends only specified data to the client with below codes
       const projectData = {
         score_tag : mcData.score_tag,
         agreement : mcData.agreement,
         subjectivity : mcData.subjectivity,
         confidence : mcData.confidence,
         irony : mcData.irony
       }
  */
  const { url } = req.body
  const URL = `${BASE_URL}?key=${API_KEY}&url=${url}&lang=en`
  const response = await fetch(URL)
  try {
    const meaningCloudData = await response.json()
    res.send(meaningCloudData)
  } catch (e) {
    console.log(e.message)
  }
})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, (error) => {
  if (error) throw new Error(error)
  console.log('Server listening on port 8081!')
})
