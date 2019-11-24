//imports
import express = require('express')
import { MetricsHandler } from './metrics'
import path from 'path'
//init ExpressJS
const app = express()
const port: string = process.env.PORT || '1337'
//set the display module
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');
//root to public dir
app.use(express.static('public'))

//default Page
app.get('/hello/:name', 
  (req: any, res: any) => res.render('hello.ejs', {name: req.params.name})
  )
app.get('/', 
  (req: any, res: any) => res.render('home.ejs')
  )
app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})