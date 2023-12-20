const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const corsOptions = require('./cors')
const axios = require('./axios')

const api = express()
const router = express.Router()

// api.use((req, res, next) => {
//   next()
// })

router.options('*', cors(corsOptions))

router.get('/search', cors(corsOptions), async (req, res, next) => {
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

router.get('/:business_id', cors(corsOptions), async (req, res, next) => {
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

router.get('/:business_id/reviews', cors(corsOptions), async (req, res, next) => {
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

api.use('/api/', router)

// const PORT = process.env.PORT || 3001
// api.listen(PORT, () => console.log(`listening on ${PORT}`))
module.exports.handler = serverless(api)
