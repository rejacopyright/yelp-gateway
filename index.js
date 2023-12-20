const express = require('express')
const cors = require('cors')
const corsOptions = require('./cors')
const axios = require('./axios')

const app = express()

app.use((req, res, next) => {
  next()
})

app.options('*', cors(corsOptions))

app.get('/search', cors(corsOptions), async (req, res, next) => {
  axios({
    method: 'get',
    url: `search`,
    params: req.query,
  })
    .then(({ data }) => {
      res.json(data)
    })
    .catch(({ response: err, message }) => {
      res.status(err.status).send({
        errors: err.data.error,
        message: message,
      })
      return next()
      // return next(err)
    })
})

app.get('/:business_id', cors(corsOptions), async (req, res, next) => {
  axios({
    method: 'get',
    url: `${req.params.business_id}`,
    params: req.query,
  })
    .then(({ data }) => {
      res.json(data)
    })
    .catch(({ response: err, message }) => {
      res.status(err.status).send({
        errors: err.data.error,
        message: message,
      })
      return next()
    })
})

app.get('/:business_id/reviews', cors(corsOptions), async (req, res, next) => {
  axios({
    method: 'get',
    url: `${req.params.business_id}/reviews`,
    params: req.query,
  })
    .then(({ data }) => {
      res.json(data)
    })
    .catch(({ response: err, message }) => {
      res.status(err.status).send({
        errors: err.data.error,
        message: message,
      })
      return next()
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))
