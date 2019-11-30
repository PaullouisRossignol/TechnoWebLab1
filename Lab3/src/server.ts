//imports
import express = require('express')
import { MetricsHandler } from './metrics'
import bodyparser from 'body-parser'

//init ExpressJS
const app = express()
const port: string = process.env.PORT || '1337'
const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')
//init   bodyparser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
//set the display module
app.set('views', __dirname + "/../views")
app.set('view engine', 'ejs');
//root to public dir
//app.use(express.static('/../public'))
app.use('/static', express.static(__dirname + '/../public'));
//display//
app.get('/hello/:name', 
  (req: any, res: any) => res.render('hello.ejs', {name: req.params.name})
  )
app.get('/', 
  (req: any, res: any) => {
    res.render('home.ejs')}
  )
  app.get('/find/', 
  (req: any, res: any) => {
    res.render('find.ejs')}
  )
  app.post('/delete/:id', (req: any, res: any) =>{
    dbMet.delete(req.params.id, (err: Error | null, msg: String) =>{
      if(err) throw err
      res.status(200).send(msg)
    });
  })
  app.post('/metrics/:id', (req: any, res: any) => {
    dbMet.save(req.params.id, req.body, (err: Error | null) => {
      if (err) throw err
      res.status(200).send('Post OK')
      res.end()
    })
  })
  app.get('/metric/:id', (req: any, res: any) => {
    //define a route 
    dbMet.getOne(req.params.id, (err: Error | null, result: any) => {
      if (err) throw err
     res.json(result)
    //to give the response
    res.end()
    })
  })
  app.get('/metrics/', (req: any, res: any) => {
    //define a route 
      dbMet.getAll((err: Error | null, result: any) => {
       if (err) throw err
      res.json(result)
     //to give the response
     res.end()
     })
   })
   app.get('/metrics.json', (req: any, res: any) => {
    dbMet.getAll((err: Error | null, result?: any) => {
      if (err) {
        throw err
      }
      res.json(result)
      //to give the response
     res.end()
    })
  })

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})

