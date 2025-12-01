import express from 'express';
import dotenv from 'dotenv'
import mainRoutes from './routes/main.ts';
import morgan from 'morgan'
import cors from 'cors'
dotenv.config({ path: ".env" })
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use((req, res, next) => {
  const allowedOrigin = ['http://localhost:8081', 'http://127.0.0.1:8081']
  const origin = req.headers.origin || ''
  if (allowedOrigin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    next()
  } else {
    res.status(403).json({ messge: 'Forbidden' })
  }
})*/
app.use(morgan('dev'))
app.use(mainRoutes)
const port = process.env.PORT || 4004
app.listen(port, () => {
  console.log(`server running at ${port}`)
})
