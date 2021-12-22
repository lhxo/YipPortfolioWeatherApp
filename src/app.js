const path = require('path')
const express = require('express')
const PORT = 3000
const hbs = require('hbs', )
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Defines paths for Express config
const pubdir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pubdir))


app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Christopher'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Christopher Yip'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        message: 'Does this question help?',
        name: 'Christopher Yip'
    })
})

//app.com/weather
app.get('/weather', (req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: "You must provide an address"
        })
    } else {
        geocode(address, (err,{latitude,longitude,location} = {})=>{
          if(err){
              return res.send({err})
          }
    
          forecast(latitude, longitude,(error, forecastData) => {
            if(err){
                return res.send({err})
            }

            res.send(
                {
                    forecast:forecastData,
                    location:location,
                    address:address,
                })
          })
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        error: 'Article not found',
        name: 'Christopher Yip'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Christopher Yip'
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port 3000')
})