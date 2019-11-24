  // Import modules
express = require('express')
metrics = require('./metrics')

app = express()
app.set('port', 1337)
//set the display module
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');
//root to public dir
path = require('path')
app.use(express.static('public'))
//listen on port 1337 and display
app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)
//get_request
app.get('/hello/:name', 
  (req, res) => res.render('hello.ejs', {name: req.params.name})
  )
app.get('/', 
  (req, res) => res.render('home.ejs')
  )
app.get('/metrics.json', (req, res) => {
    metrics.get((err, data) => {
      if(err) throw err
      res.status(200).json(data)
    })
  })


