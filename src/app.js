const path = require('path');
const express = require('express'); //express is actually a function
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/getforecast');

const app =  express();
//paths for express config
const viewsPath = path.join(__dirname,  '../templates/views')
const publicPath =path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to servce
app.use(express.static(publicPath));

app.get('', (req,res)=> {
  res.render('index', {
    title: 'weather',
    name: 'yongjoong'
  });
})

app.get('/about', (req,res)=>{
    res.render('about', {
      title: 'about me',
      name: 'yongjoong'
    })
})

app.get('/weather', (req, res)=> {
  if(!req.query.address){
    return res.send({
      error: 'you must enter a valid address!'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{ //define default parameters in case callback is unable to be destrcutured
    if (error){
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData)=>{
      if (error){
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req,res)=>{
  if(!req.query.search){
    return res.send({
      error: 'you must provide a valid search term!'
    })
  }
  console.log(req.query.search);
  res.send({
    products:[]
  })
})

app.get('/help', (req,res)=> {
  res.render('help', {
    title: 'help page',
    name: 'yongjoong',
    message: 'This is the help page!'
  });
})

app.get('/help/*', (req,res)=>{ //matches everything that comes after /help/
  res.render('error', {
    title: "404 Page",
    message: "Help article not found.",
    name: 'yongjoong'
  })
})

app.get('*', (req,res)=>{   ///    * means match everything else that has not been matched. this must come last as it checks above matched routes to decide whether current route is matchable or not.
  res.render('error', {
    title: "404 Page",
    name: 'yongjoong',
    message: 'page not found.'
  })
})

app.listen(3000, ()=>{
  console.log('server running on port 3000!');
});
