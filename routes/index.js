const {Router} = require('express');
const router = Router();

const path = require('path');

const Usuario = require('../models/usuario');

router.get('/', async (req, res) =>{
    const images = await Usuario.find();
    res.render('index',{ images });
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', async (req, res) => {
    const image = new Usuario();
    image.nombre = req.body.nombre;
    image.correo = req.body.correo;
    image.telefono = req.body.telefono;
    image.estado_civil = req.body.estado_civil;
    image.tiene_hijos = req.body.tiene_hijos;
    image.intereses = req.body.intereses;
    
    
    await image.save();

    res.redirect('/');
});
router.get('/image/:id', async ( req, res) => {
    const {id} = req.params;
    const image = await Usuario.findById(id);
    res.render('delete', { image });
});
router.get('/image/:id/delete', async (req, res) => {
    const {id} = req.params;
    const image = await Usuario.findById(id);
    image.remove();
    res.redirect('/');
});
router.get('/imageedit/:id', async ( req, res) => {
    const {id} = req.params;
    const image = await Usuario.findById(id);
    res.render('edit', { image });
});
router.post('/image/:id/edit', async (req, res) => {
    const id = req.body.id;
    const image = await Usuario.findById(id);
    let image_ = {
            nombre : req.body.nombre,
            correo : req.body.correo,
            telefono : req.body.telefono,
            estado_civil : req.body.estado_civil,
            tiene_hijos : req.body.tiene_hijos,
            intereses : req.body.intereses,
        }      
    await Usuario.findByIdAndUpdate(id, image_);
    res.redirect('/');
});

module.exports = router;
