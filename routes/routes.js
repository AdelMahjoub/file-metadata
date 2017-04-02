const express = require('express');
const multiparty = require('multiparty');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).render('index');
});

router.post('/uploads', function(req, res, next) {
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if(err) {
      return res.status(500).send('Sorry, an unexpected error occured.');
    } else {
      console.log(files.file[0].size);
      res.json({
        'bytes': files.file[0].size,
        'kilobytes': (files.file[0].size / 1024),
        'megabytes': ((files.file[0].size / 1024) / 1024)
      });
    }
  });
});

module.exports = router;