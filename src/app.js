const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//  __dirname --> es una campo que da node para saber en que dir estamos
// console.log(__dirname)
// console.log(path.join(__dirname,'../public')) --> path es un libreria para utilizar los directorios
// IMPORTANT ------> para poder lanzarlo: nodemon src/app.js -e js,hbs
//levanto el server
const app = express()

const port = process.env.PORT || 3000

// ***** Define patah for express config
const publicDirectoryPath = path.join(__dirname, '../public')
// cuando cambiamos el nombre de la carpeta views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// ***** Setup handlebars engine and views location
// HBS
app.set('view engine', 'hbs')
// aqui le digo a express como se llama el nuevo directoria de Views --> templates folder
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// ***** Setup static directory to server
app.use(express.static(publicDirectoryPath))

// mostrar el index.hbs --> render hace referencia al archivo hds, tiene que ponerse el mismo nombre
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gaby M'
    })
})

// lo comentamos porque al añadir el archivo index.html y nunca se ejcutara este código
// tiene 2 argument, uno es la direccion y la otra es una funcion de lo que hará cuando regresa del server
// app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>')
// })

// //enviar un JSON
// app.get('/help',(req,res) =>{
//     res.send([{
//         name: 'Gaby',
//         age: 30
//     } , {
//         name: 'Jose'
//     }])
// })

// app.get('/about',(req,res) =>{
//     res.send('<h1>Welcome to the Help page</h1>')
// })

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Gaby M'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        message: 'This is the message for the help page',
        title: 'Help',
        name: 'Gaby M'
    })
})

//******* To comunicate with the SERVER - geocode abd forecast */
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    } else {
        geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
            if (error){
                return res.send({error})
            }else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error){
                        return res.send({error})
                    }
                
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address

                    })
                })
            }
        })
    }
 
})
//routs que puede tener nuesta website
// app.com
// app.com/help
// app.com/about

//ejemplo de añadir query en la URL de la web:
app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide the seach term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Gaby M'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'My 404 page',
        name: 'Gaby M'
    })
})

//levantar el server y el puerto
app.listen(port, () => {
    console.log('Server is up on port '+port)
})