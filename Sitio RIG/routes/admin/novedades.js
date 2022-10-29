var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

// para listar las novedades
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
}); //cierra inicial

// para eliminar las novedades
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades');

}); // cierra get de eliminar

/* vista para agregar las novedades */

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  }) // cierra render
}); // cierra get

/* insertar la novedad en la tabla */

router.post('/agregar', async (req, res, next) => {
  try {
    //console.log(req.body)
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó la novedad'
    })
  }
})


/*para listar UNA SOLA NOVEDAD BY ID - modificar*/

router.get('/modificar/:id', async (req, res, next) => {

  console.log(req.params.id);
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);

  console.log(req.params.id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  })
});

/* modificando la novedad */
router.post('/modificar', async (req, res, next) => {
  try {

    console.log(obj)

    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');

  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó la novedad'
    })
  }
})


module.exports = router;