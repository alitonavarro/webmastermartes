var express = require('express');
var router = express.Router();

// para listar las novedades
router.get('/', function (req, res, next) {
  res.render('admin/novedades', { 
    layout: 'admin/layout',
  });
}); //cierra inicial

module.exports = router;