var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/cperezv', (_, res) => {
  console.log(`__dirname ${__dirname}`);
  res.sendFile(path.join(__dirname, '../public', 'build_react_apps', 'cperezv', 'index.html'));
});

router.get('/pet', (_, res) => {
  console.log(`__dirname ${__dirname}`);
  res.sendFile(path.join(__dirname, '../public', 'build_react_apps', 'pet', 'index.html'));
});
module.exports = router;
