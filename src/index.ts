import express from 'express'
import { Request, Response } from 'express';

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.send('Test Route')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
