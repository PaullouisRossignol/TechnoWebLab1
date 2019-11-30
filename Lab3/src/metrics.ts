import LevelDB from './leveldb'
import WriteStream from 'level-ws'


export class Metric {
    public timestamp: string
    public value: number
  
    constructor(ts: string, v: number) {
      this.timestamp = ts
      this.value = v
    }
  }
  
  export class MetricsHandler {
    private db: any 
  
    constructor(dbPath: string) {
      this.db = LevelDB.open(dbPath)
    }
  
    public delete(key: number, callback: (error: Error | null, result: any) => void){
        //message to display
        let message : string 
        message = "Unable to find your metric"
        
        //deliting a metric from the table
        this.db.del( key , function(err){
          if(err)	{
            console.log('Unable to find your metric')
            callback(err, message)
          }else
            console.log("no error")
        })
        //changing the message if delition was successfull
        message = "metric with id "+ key+ " is deleted"
        console.log("metric with id "+ key+ " is deleted")
        //returning the message to display
        callback(null, message)
    }
    public save(
        key: number,
        metrics: Metric[], 
        callback: (error: Error | null) => void) {

      const stream = WriteStream(this.db)
        stream.on('error', callback)
        stream.on('close', callback)
        metrics.forEach((m: Metric) => {
      stream.write({ key: `${key}:${m.timestamp}`, value: m.value })
      })
      stream.end()
    }
    public getOne(key: number, callback: (error: Error | null, result: any) => void)
    {
        let metric: Metric = new Metric("null", 0)
        this.db.createReadStream()
		  .on('data', function (data) {
            //console.log(data.key.split(':'))
            if(data.key == key)
            {
                metric = data
            }
		  })
		  .on('error', function (err) {
			console.log('Oh my!', err)
			callback(err, null)
		  })
		  .on('end', function () {
            //console.log('Stream ended')
            callback(null, metric)
		  })
    }
    public getAll(callback: (error: Error | null, result: any) => void) {
        let metrics: Metric[] = []
		this.db.createReadStream()
		  .on('data', function (data) {
            metrics.push(data)
		  })
		  .on('error', function (err) {
			console.log('Oh my!', err)
			callback(err, null)
		  })
		  .on('close', function () {
            //console.log('Stream closed')
		  })
		  .on('end', function () {
            //console.log('Stream ended')
            callback(null, metrics)
		  })
	}
}