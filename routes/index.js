var express = require('express');
var router = express.Router();
const helpers = require('../helpers/url-helpers')
/* GET home page. */
router.get('/', function (req, res, next) {
  helpers.getUrlHistory().then((data) => {
    res.render('index', {data});
  })
  
});
router.post('/short-url', (req, res) => {
  helpers.shortenUrl(req.body).then(() => {
    res.redirect('/')
  })
})
router.get('/:id', (req, res) => {
  shortUrl = req.params.id
  helpers.findUrl(shortUrl).then((response)=> {
    if (response) {
      helpers.incrementClicks(shortUrl).then(() => {

      })
      res.redirect(response.fullUrl)
    } else {
      res.sendStatus(404)
    }
    
  })
})

module.exports = router;
