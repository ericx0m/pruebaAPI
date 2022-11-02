const { Router, application } = require('express');
const router = Router();
const _ = require('underscore');
const express = require('express');
const app = express();
const fs = require('fs');

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
        const _id = preguntas.length;
        const newPre = {_id ,...req.body};
        preguntas.push(newPre);
        const json_books = JSON.stringify(preguntas);
        fs.writeFileSync('src/alternativas.json', json_books, 'utf-8');
        res.status(200).redirect('/api/preguntas');
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
        const json_books = JSON.stringify(preguntas);
        fs.writeFileSync('src/alternativas.json', json_books, 'utf-8');
        res.status(200).redirect('/api/preguntas');
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
    const json_books = JSON.stringify(preguntas);
    fs.writeFileSync('src/alternativas.json', json_books, 'utf-8');
    res.status(200).redirect('/api/preguntas');
});

module.exports = router;