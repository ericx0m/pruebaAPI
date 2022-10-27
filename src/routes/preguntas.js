const { Router, application } = require('express');
const router = Router();
const _ = require('underscore');
const express = require('express');
const app = express();

app.use(express.json());
const preguntas = require('../alternativas.json');

router.get('/',(req,res) => {
    res.json(preguntas);
});

router.get('/:id',(req,res) => {
    const {id} = req.params;
    res.json(preguntas[id]);
})

//agregar datos
router.post('/', (req, res) =>{
    const { categoria, tipo_Pregunta, dificultad, titulo, opciones} = req.body;
    if(categoria && tipo_Pregunta && dificultad && titulo && opciones){
        const _id = preguntas.length + 1;
        const newPre = {_id ,...req.body};
        preguntas.push(newPre);
        res.json(preguntas);
    }else{
        res.status(500).json({error: 'Hubo un error.'});
    }
});

//Actualizar datos
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const { categoria, tipo_Pregunta, dificultad, titulo, opciones} = req.body;
    if(categoria && tipo_Pregunta && dificultad && titulo && opciones){
        _.each(preguntas, (preg, i) =>{
            if(preg._id == id){
                preg.categoria = categoria;
                preg.tipo_Pregunta = tipo_Pregunta;
                preg.dificultad = dificultad;
                preg.titulo = titulo;
                preg.opciones = opciones
            }
        });
        res.json(preguntas);
    }else{
        res.status(500).json({error: 'hubo un error.'})
    }
});


// Borrar datos
router.delete('/:id', (req,res) => {
    const { id } = req.params;
    _.each(preguntas, (preg, i) => {
        if(preg._id == id){
            preguntas.splice(i,1);
        }
    });
    res.send(preguntas);
});

module.exports = router;